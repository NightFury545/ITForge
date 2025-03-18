<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\CreateProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function __construct(private readonly ProjectService $projectService)
    {
    }

    /**
     * Показати список проєктів
     */
    public function index(Request $request): Response
    {
        $projects = $this->projectService->getProjects($request->query('per_page', 20));

        return Inertia::render('projects', [
            'projects' => $projects,
        ]);
    }

    /**
     * Показати конкретний проєкт
     */
    public function show(string $id): Response
    {
        $project = $this->projectService->getProjectById($id);

        return Inertia::render('project-details', [
            'project' => $project,
        ]);
    }

    /**
     * Створити новий проєкт
     */
    public function store(CreateProjectRequest $request): RedirectResponse
    {
        $this->projectService->createProject($request->validated());

        return to_route('projects.index')->with('success', 'Проєкт створено успішно!');
    }

    /**
     * Оновити існуючий проєкт
     */
    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $this->projectService->updateProject($project, $request->validated());

        return to_route('projects.index')->with('success', 'Проєкт оновлено успішно!');
    }

    /**
     * Видалити проєкт
     */
    public function destroy(Project $project): RedirectResponse
    {
        $this->projectService->deleteProject($project);

        return to_route('projects.index')->with('success', 'Проєкт видалено успішно!');
    }
}
