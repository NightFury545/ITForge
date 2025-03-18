import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const breadcrumbs: BreadcrumbItem[] = [{ title: "Developers", href: "/developers" }];

const developers = [
    { id: 1, name: "John Doe", skills: ["React", "Node.js"], experience: 5, rating: 4.8, price: 50, portfolio: "https://github.com/johndoe" },
    { id: 2, name: "Jane Smith", skills: ["Laravel", "Vue.js"], experience: 3, rating: 4.5, price: 40, portfolio: "https://github.com/janesmith" },
    { id: 3, name: "Alex Johnson", skills: ["Python", "Django"], experience: 7, rating: 4.9, price: 60, portfolio: "https://github.com/alexjohnson" },
];

export default function DevelopersPage() {
    const [search, setSearch] = useState("");
    const [filterTech, setFilterTech] = useState("");
    const [filterExp, setFilterExp] = useState("");

    const filteredDevelopers = developers.filter(dev => 
        (search ? dev.name.toLowerCase().includes(search.toLowerCase()) || dev.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase())) : true) &&
        (filterTech ? dev.skills.includes(filterTech) : true) &&
        (filterExp ? dev.experience >= parseInt(filterExp) : true)
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Developers" />
            <div className="p-4 space-y-4">
                {/* Панель фільтрів */}
                <div className="flex flex-col md:flex-row gap-4">
                    <Input placeholder="Search developers..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full md:w-1/3" />
                    <Select value={filterTech} onValueChange={setFilterTech}>
    <SelectTrigger className="w-full md:w-1/4">
        <SelectValue placeholder="Select Technology" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="">All Technologies</SelectItem>
        <SelectItem value="React">React</SelectItem>
        <SelectItem value="Vue.js">Vue.js</SelectItem>
        <SelectItem value="Node.js">Node.js</SelectItem>
    </SelectContent>
</Select>
                </div>

                {/* Список розробників */}
                <div className="grid md:grid-cols-3 gap-4">
                    {filteredDevelopers.map(dev => (
                        <Card key={dev.id} className="border border-gray-700 dark:border-gray-600 rounded-xl shadow-md">
                            <CardHeader>
                                <CardTitle>{dev.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">Skills: {dev.skills.join(", ")}</p>
                                <p className="text-sm">Experience: {dev.experience} years</p>
                                <p className="text-sm">
                                    Rating: ⭐ {dev.rating}
                                </p>
                                <p className="text-sm">Rate: ${dev.price}/hr</p>
                                <p className="text-sm">
                                    Portfolio: <a href={dev.portfolio} className="text-blue-500" target="_blank">View</a>
                                </p>
                                <div className="flex gap-2 mt-3">
                                    <Button className="w-1/2">Hire</Button>
                                    <Link href={`/developers/${dev.id}`} className="w-1/2">
                                        <Button variant="outline" className="w-full">View Profile</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
