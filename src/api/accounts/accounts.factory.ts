import { Factory, Faker } from '@mikro-orm/seeder';
import { Account } from './entities';
import * as bcrypt from 'bcrypt';

export class AccountsFactory extends Factory<Account> {
    model = Account;

    definition(faker: Faker): Partial<Account> {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const userName = `${firstName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}`;
        const email = `${userName}@gmail.com`;

        return {
            firstName,
            lastName,
            userName,
            email,
            passwordHash: bcrypt.hashSync('Abcd1234', 10),
        };
    }
}
