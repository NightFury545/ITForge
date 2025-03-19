import { MenuItem, FormControl, InputLabel, Select, OutlinedInput, Chip } from "@mui/material";

interface MultiSelectProps {
    options: string[];
    selected: string[];
    onChange: (val: string[]) => void;
}

export function MultiSelect({ options, selected, onChange }: MultiSelectProps) {
    return (
        <FormControl fullWidth>
            <InputLabel>Технологічний стек</InputLabel>
            <Select
                multiple
                value={selected}
                onChange={(e) => onChange(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                input={<OutlinedInput label="Технологічний стек" />}
                renderValue={(selected) => (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {(selected as string[]).map((tech) => (
                            <Chip key={tech} label={tech} />
                        ))}
                    </div>
                )}
            >
                {options.map((tech) => (
                    <MenuItem key={tech} value={tech}>
                        {tech}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
