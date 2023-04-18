export const ListRoles = [
    {
        name: "SYS_ADMIN",
        description: "Administrator",
        rolelevel: 1,
    },
    {
        name: "USER_ADMIN",
        description: "Manager",
        rolelevel: 2,
    },
    {
        name: "AUDITOR",
        description: "Auditor",
        rolelevel: 3,
    },
    {
        name: "FARMING_INDUSTRY",
        description: "Customer",
        rolelevel: 4,
    }

];

export const UserMock = {
        roleId: 1,
        isActive: true,
        name: "user Administrator",
        email: "user.admin@test.com",
        password: "qwer1234",
        refreshToken: null,
};