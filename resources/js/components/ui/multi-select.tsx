import { MenuItem, FormControl, Select, OutlinedInput, Chip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface MultiSelectProps {
    options: string[];
    selected: string[];
    onChange: (val: string[]) => void;
}

// Створення теми з темним фоном для випадаючого списку
const theme = createTheme({
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: '#333', // Темний фон для чипсів
                    color: '#fff', // Білий текст для чипсів
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#333', // Темний фон для випадаючого списку
                    color: '#fff', // Білий текст для випадаючого списку
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: '#555', // Темний фон для вибраного елемента
                    },
                    '&:hover': {
                        backgroundColor: '#444', // Темний фон при наведенні
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid rgb(46, 46, 46)', // Бордер як у "Вимоги"
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(82, 82, 82)', // Темніший сірий бордер при наведенні
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#757575', // Ще темніший сірий бордер при фокусі
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: 'rgb(82, 81, 81)', // Білий колір для стрілочки
                },
            },
        },
    },
});

export function MultiSelect({ options, selected, onChange }: MultiSelectProps) {
    return (
        <ThemeProvider theme={theme}>
            <FormControl fullWidth>
                <Select
                    multiple
                    value={selected}
                    onChange={(e) => onChange(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                    input={<OutlinedInput label={null} />} // Прибираємо напис "Технологічний стек"
                    renderValue={(selected) => (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                            {(selected as string[]).map((tech) => (
                                <Chip key={tech} label={tech} />
                            ))}
                        </div>
                    )}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                backgroundColor: '#333', // Темний фон для випадаючого списку
                                color: '#fff', // Білий текст для випадаючого списку
                            },
                        },
                    }}
                >
                    {options.map((tech) => (
                        <MenuItem key={tech} value={tech}>
                            {tech}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
}