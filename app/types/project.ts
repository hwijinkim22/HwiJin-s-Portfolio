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
        screenshots?: {
            image: string;
            title: string;
            description: string;
        }[];
        troubleshooting?: {
            title: string;
            problem: string;
            solution: string;
            result: string;
        }[];
    };
};