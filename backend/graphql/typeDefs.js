const { gql } = require('apollo-server')


// User = Student
// Instructor = Instructor


module.exports = gql`
    type User {
        username: String!
        email: String!
        createdAt: String!
        token: String
        imageUrl: String
        matches: [String]
        latestMessage: Message
        role: String!
    }
    type Instructor {
        user_id: Int!
    }
    type Student {
        user_id: Int!
    }
    type Message{
        uuid: String!
        content: String!
        from: String!
        to: String!
        createdAt: String!
        reactions: [Reaction]
    }
    type Reaction {
        uuid: String!
        content: String!
        createdAt: String!
        message: Message!
        user: User
        instructor: Instructor
    }
    union StudOrInst = User | Instructor
    type Query {
        getUsers:[User]!
        getStudents: [Student]!
        getInstructors: [Instructor]!
        getMatchedStudents:[Student]!
        getMatchedInstructors:[Instructor]!
        login(
            username: String!
            password: String!
            isInstructor: Boolean!
            ): StudOrInst!
        getMessages(from: String!): [Message]!
    }
    type Mutation{
        register(
            username: String! 
            email: String! 
            password: String! 
            confirmPassword: String!
            ): User!
        sendMessage(
            to: String!
            content: String!
        ): Message!
        reactToMessage(uuid: String! content: String!): Reaction!
        match: Instructor!
    }
    type Subscription{
        newMessage: Message!
        newReaction: Reaction!
    }
`