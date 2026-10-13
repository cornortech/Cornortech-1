export interface JobOpening {
    role: string;
    status: 'Open' | 'Closed';
    location: string;
    type: string;
    tags: string[];
    desc: string;
    skills?: string[];
    responsibilities?: string[];
}

export const OPENINGS: JobOpening[] = [
    // --- Open Intern Roles ---
    { 
        role: 'Graphics Design Intern', 
        status: 'Open', 
        location: 'Remote / Hybrid (Butwal)', 
        type: 'Internship (F/P)', 
        tags: ['Design', 'Creative'], 
        desc: 'Work closely with our creative team on real projects, creating graphics for social media, websites, and campaigns.',
        skills: ['Photoshop', 'Illustrator', 'Canva'],
        responsibilities: [
            'Design graphics for social media campaigns and websites',
            'Assist marketing and design teams',
            'Maintain brand consistency'
        ]
    },
    { 
        role: 'Video Editing Intern', 
        status: 'Open', 
        location: 'Remote / Hybrid', 
        type: 'Internship', 
        tags: ['Video', 'Editing'], 
        desc: 'Assist in producing and editing engaging video content for marketing, product demos, and campaigns.',
        skills: ['Premiere Pro', 'After Effects', 'Final Cut'],
        responsibilities: [
            'Edit and assemble video footage for campaigns',
            'Add motion graphics and effects',
            'Ensure brand alignment and quality'
        ]
    },
    { 
        role: 'MERN Stack Intern', 
        status: 'Open', 
        location: 'Remote', 
        type: 'Internship', 
        tags: ['Development', 'MERN'], 
        desc: 'Join our development team to build real-world applications using MongoDB, Express, React, and Node.js.',
        skills: ['JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Git'],
        responsibilities: [
            'Develop frontend and backend features',
            'Integrate databases and APIs',
            'Collaborate with designers and developers'
        ]
    },
    // --- Closed Employee Roles ---
    { 
        role: 'Senior Full Stack Developer',    
        status: 'Closed', 
        location: 'Remote',           
        type: 'Full-time', 
        tags: ['React', 'Node.js'], 
        desc: 'Build and scale our core product infrastructure. You will own critical features end-to-end, from architecture to deployment.',
        skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS'],
        responsibilities: [
            'Architect and develop scalable web applications',
            'Lead technical design and code reviews',
            'Mentor junior developers and improve engineering standards'
        ]
    },
    { 
        role: 'UI/UX Designer',                 
        status: 'Closed', 
        location: 'Hybrid · Butwal',   
        type: 'Full-time', 
        tags: ['Figma', 'Design Systems'], 
        desc: 'Shape the visual identity of our products. You will design intuitive interfaces that delight users and convert visitors.',
        skills: ['Figma', 'Prototyping', 'Design Systems', 'User Research'],
        responsibilities: [
            'Create high-fidelity mockups and interactive prototypes',
            'Develop and maintain our internal design system',
            'Conduct user testing and iterate based on feedback'
        ]
    },
    { 
        role: 'DevOps Engineer',                
        status: 'Closed', 
        location: 'Remote',            
        type: 'Full-time', 
        tags: ['AWS', 'Kubernetes'], 
        desc: 'Own our cloud infrastructure. Build reliable CI/CD pipelines, monitor systems, and keep everything running at scale.',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
        responsibilities: [
            'Manage and scale cloud infrastructure',
            'Automate deployment processes and monitoring',
            'Ensure system security and high availability'
        ]
    },
    { 
        role: 'Digital Marketing Specialist',   
        status: 'Closed', 
        location: 'On-site · Butwal',  
        type: 'Full-time', 
        tags: ['SEO', 'Meta Ads'], 
        desc: 'Drive growth through data-driven campaigns. Own SEO, paid ads, and analytics to bring qualified leads to our doorstep.',
        skills: ['SEO', 'Meta Ads', 'Google Analytics', 'Content Strategy'],
        responsibilities: [
            'Execute data-driven marketing campaigns',
            'Optimize SEO and manage paid advertising budgets',
            'Analyze traffic and conversion metrics to improve ROI'
        ]
    },
    { 
        role: 'React Native Developer',         
        status: 'Closed', 
        location: 'Remote',            
        type: 'Contract', 
        tags: ['React Native', 'Mobile'], 
        desc: 'Build polished cross-platform mobile apps. Work closely with design to ship experiences users love on iOS and Android.',
        skills: ['React Native', 'TypeScript', 'Redux', 'iOS/Android APIs'],
        responsibilities: [
            'Develop and maintain high-performance mobile applications',
            'Integrate with backend APIs and third-party services',
            'Ensure smooth UI/UX animations and responsiveness'
        ]
    },
    { 
        role: 'Business Development Executive', 
        status: 'Closed', 
        location: 'On-site · Butwal',  
        type: 'Full-time', 
        tags: ['Sales', 'Strategy'], 
        desc: 'Open new markets and build lasting client relationships. You will be the face of Cornor Tech to enterprise decision-makers.',
        skills: ['Sales Strategy', 'CRM', 'Communication', 'Market Analysis'],
        responsibilities: [
            'Identify and pursue new business opportunities',
            'Build and maintain strong relationships with enterprise clients',
            'Develop sales strategies to achieve growth targets'
        ]
    },
];
