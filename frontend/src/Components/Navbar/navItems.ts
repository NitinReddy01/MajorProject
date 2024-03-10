type NavItemObj ={
    name:string,
    link:string
}

interface NavItemsType {
    [key:string]: NavItemObj[]
}

export const navItems:NavItemsType = {
    user: [
        {
            name: 'Profile',
            link: '/profile',
        },
        {
            name: "Upload",
            link: '/'
        },
        {
            name:"Reports",
            link:'/patient/reports'
        }
    ],
    doctor: [
        {
            name: 'Profile',
            link: '/profile',
        },
        {
            name: "Pateints",
            link: '/patients'
        }
    ],
    admin : [
        {
            name:'Profile',
            link:'/profile'
        },
        {
            name:'Doctors',
            link:'/doctors'
        },
        {
            name:'Users',
            link:'/users'
        }
    ]
}