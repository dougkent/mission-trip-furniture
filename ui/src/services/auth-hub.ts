// AWS
import Amplify, { API, graphqlOperation, Auth, Hub } from 'aws-amplify';
import aws_exports from '../aws-exports';

// uuid
import { v4 as uuid } from 'uuid';

// MTF
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { CreateUserInput } from '../models';

// Configure
Amplify.configure(aws_exports);

const listener = async (data: any) => {
    const userCreator = new UserCreator();

    switch (data.payload.event) {
        case 'signIn':
            await userCreator.createUserIfNotExists();
            break;
        case 'signUp':
            await userCreator.createUser();
            break;
    }
};

export const listenToAuthEvents = () => {
    Hub.listen('auth', listener);
};

class UserCreator {
    public async createUserIfNotExists() {
        const user = await Auth.currentAuthenticatedUser();

        const userResult = await API.graphql(
            graphqlOperation(queries.getUser, { username: user.username })
        );

        if (!userResult.username) {
            await this.createUserByUsername(user.username);
        }
    }
    public async createUser() {
        const user = await Auth.currentAuthenticatedUser();

        await this.createUserByUsername(user.username);
    }

    private async createUserByUsername(username: string) {
        var createUserInput: CreateUserInput = {
            id: uuid(),
            username: username,
            planIdsCreated: [],
            planIdsFavorited: [],
        };

        await API.graphql(
            graphqlOperation(mutations.createUser, { input: createUserInput })
        );
    }
}
