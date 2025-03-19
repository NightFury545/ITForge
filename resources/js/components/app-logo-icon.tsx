import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            {/* Основа кузні (кована структура) */}
            <rect x="100" y="500" width="600" height="50" fill="#4A3520" /> {/* Підлога */}
            <rect x="150" y="200" width="50" height="300" fill="#5C4430" /> {/* Ліва стійка */}
            <rect x="600" y="200" width="50" height="300" fill="#5C4430" /> {/* Права стійка */}
            <rect x="150" y="200" width="500" height="50" fill="#6B4F3A" /> {/* Верхня балка */}

            {/* Вогнище */}
            <circle cx="400" cy="400" r="100" fill="#FF4500" /> {/* Вогонь */}
            <circle cx="400" cy="400" r="70" fill="#FF8C00" /> {/* Ядро вогню */}
            <circle cx="400" cy="400" r="40" fill="#FFD700" /> {/* Найяскравіша частина */}

            {/* Кований молот */}
            <rect x="380" y="250" width="40" height="150" fill="#333333" /> {/* Руків'я */}
            <rect x="350" y="400" width="100" height="20" fill="#555555" /> {/* Голівка молота */}
            <rect x="375" y="400" width="50" height="40" fill="#777777" /> {/* Нижня частина голівки */}

            {/* Ковадло */}
            <rect x="300" y="550" width="200" height="30" fill="#444444" /> {/* Основа ковадла */}
            <rect x="350" y="530" width="100" height="20" fill="#666666" /> {/* Верхня частина ковадла */}

            {/* Додаткові деталі (ковані елементи) */}
            <rect x="200" y="520" width="400" height="10" fill="#5C4430" /> {/* Кована основа */}
            <circle cx="250" cy="525" r="8" fill="#6B4F3A" /> {/* Кований цвях */}
            <circle cx="550" cy="525" r="8" fill="#6B4F3A" /> {/* Кований цвях */}

            {/* Іскри */}
            <circle cx="420" cy="350" r="5" fill="#FFD700" /> {/* Іскра 1 */}
            <circle cx="450" cy="330" r="5" fill="#FFD700" /> {/* Іскра 2 */}
            <circle cx="380" cy="360" r="5" fill="#FFD700" /> {/* Іскра 3 */}
        </svg>
    );
}