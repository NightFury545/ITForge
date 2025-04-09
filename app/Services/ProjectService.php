<?php

namespace App\Services;

use App\Enums\ProjectStatus;
use App\Models\Project;
use App\Services\Filters\JsonFilter;
use App\Services\Filters\RangeFilter;
use Carbon\Carbon;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProjectService
{
    /**
     * Отримати список проектів з фільтрацією, сортуванням та пошуком
     */
    public function getProjects(): LengthAwarePaginator
    {
        return QueryBuilder::for(Project::class)
            ->with('client')
            ->allowedFilters([
                AllowedFilter::partial('title'),
                AllowedFilter::partial('client.name'),
                AllowedFilter::partial('requirements'),
                AllowedFilter::custom('budget', new RangeFilter()),
                AllowedFilter::custom('tech_stack', new JsonFilter()),
                AllowedFilter::exact('status'),
            ])
            ->allowedSorts(['created_at', 'budget', 'bids_deadline', 'project_deadline'])
            ->allowedIncludes(['bids'])
            ->latest()
            ->paginate();
    }

    /**
     * Отримати один проєкт разом із клієнтом і ставками (з іменами девелоперів).
     */
    public function getProjectById(string $id): ?Project
    {
        return Project::with(['client', 'bids' => function ($query) {
            $query->join('users', 'bids.developer_id', '=', 'users.id')
                ->orderBy('bids.created_at', 'desc')
                ->select(['bids.*', 'users.name as developer_name', 'users.avatar as developer_avatar']);
        }])->findOrFail($id);
    }


    /**
     * Створити новий проект
     *
     * @throws Exception
     */
    public function createProject(array $data): Project
    {
        DB::beginTransaction();
        try {
            $preparedData = $this->prepareCreateProjectData($data);
            $this->validateProjectData($preparedData);
            $project = Project::create($preparedData);
            DB::commit();
            return $project;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Не вдалось створити проєкт: ' . $e->getMessage());
        }
    }

    /**
     * Оновити існуючий проект
     *
     * @throws Exception
     */
    public function updateProject(Project $project, array $data): Project
    {
        DB::beginTransaction();
        try {
            $preparedData = $this->prepareUpdateProjectData($project, $data);
            $this->validateProjectData($preparedData);
            $project->update($preparedData);
            DB::commit();
            return $project;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Не вдалось оновити проєкт: ' . $e->getMessage());
        }
    }

    /**
     * Видалити проект
     *
     * @throws Exception
     */
    public function deleteProject(Project $project): void
    {
        DB::beginTransaction();
        try {
            $project->delete();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Не вдалось видалити проєкт.');
        }
    }

    private function prepareCreateProjectData(array $data): array
    {
        return [
            'client_id' => Auth::id(),
            'title' => $data['title'],
            'description' => $data['description'],
            'budget' => $data['budget'],
            'requirements' => $data['requirements'],
            'tech_stack' => $data['tech_stack'],
            'bids_deadline' => $data['bids_deadline'],
            'project_deadline' => $data['project_deadline'],
            'status' => ProjectStatus::OPEN->value,
        ];
    }

    private function prepareUpdateProjectData(Project $project, array $data): array
    {
        return [
            'title' => $data['title'] ?? $project->title,
            'description' => $data['description'] ?? $project->description,
            'budget' => $data['budget'] ?? $project->budget,
            'requirements' => $data['requirements'] ?? $project->requirements,
            'tech_stack' => $data['tech_stack'] ?? $project->tech_stack,
            'bids_deadline' => $data['bids_deadline'] ?? $project->bids_deadline,
            'project_deadline' => $data['project_deadline'] ?? $project->project_deadline,
        ];
    }

    /**
     * @throws Exception
     */
    private function validateProjectData(array $data): void
    {
        if (isset($data['bids_deadline']) && isset($data['project_deadline'])) {
            $bidsDeadline = new Carbon($data['bids_deadline']);
            $projectDeadline = new Carbon($data['project_deadline']);

            if ($bidsDeadline->greaterThan($projectDeadline)) {
                throw new Exception('Дата завершення подачі пропозицій не може бути пізнішою за кінцеву дату проєкту.');
            }
        }
    }
}

