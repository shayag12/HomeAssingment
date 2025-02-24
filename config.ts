
import { faker } from '@faker-js/faker';  

// save these as environment variables
export const randomFirstName = faker.person.firstName();
export const randomLastName = faker.person.lastName();
export const randomEmail = faker.internet.email();
export const randomPassword = faker.internet.password();
