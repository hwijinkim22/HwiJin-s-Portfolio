export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    image: string;
    date: string;
    details?: {
        overview: string;
        features: string[];
        github?: string;
        demo?: string;
    };
};