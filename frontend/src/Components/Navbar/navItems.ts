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
            link: '/user/profile',
        },
        {
            name: "Upload",
            link: '/user'
        },
        {
            name:"Reports",
            link:'/user/reports'
        }
    ],
    doctor: [
        {
            name: 'Profile',
            link: '/doctor/profile',
        },
        {
            name: "Patients",
            link: '/doctor'
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