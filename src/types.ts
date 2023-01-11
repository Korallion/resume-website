export interface Project{
    name: string;
    status: 'ongoing' | 'completed';
    startDate: string;
    description: string;
    links: Link[];
    skills: Link[];
}

export interface Link{
    name: string;
    url: string;
}

export interface Me{
    name: string;
    about: string;
}

export interface About{
    me: Me,
    projects: Project[];
}