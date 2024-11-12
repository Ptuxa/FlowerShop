export enum EnumUserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',    
}

export function getRoleFromString(roleLine: string): EnumUserRole {
    if (Object.values(EnumUserRole).includes(roleLine as EnumUserRole)) {
        return roleLine as EnumUserRole;
    }

    throw Error(`Error: unknown user role ${roleLine}.`);
}