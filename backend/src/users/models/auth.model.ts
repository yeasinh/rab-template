import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AdminMenu } from 'src/configuration/models/admin-menu.model';
import { Permission } from 'src/configuration/models/permission.model';
import { UserType } from 'src/prisma/user-type.enum';

@ObjectType()
export class Auth{

    @Field(type => Int)
    id: number;
    
    @Field()
    name: string;
    
    @Field()
    token: string;

    @Field(() => UserType,{ defaultValue: UserType.OTHER })
    userType: keyof typeof UserType;

    @Field(()=> [Int])
    permissionId?: number[];
    
    @Field(()=> [Permission])
    permissions?: Permission[];
    
    @Field(()=> [AdminMenu])
    menus?: AdminMenu[]
}