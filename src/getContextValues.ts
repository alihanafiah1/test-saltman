import { Context } from "@actions/github/lib/context";

interface GetContextValuesProps {
  context: Context;
}

interface ContextValues {
  prNumber: number;
  username: string;
}

export const getContextValues = ({ context }: GetContextValuesProps): ContextValues => {
  if (context.payload.pull_request) {
    return {
      prNumber: context.payload.pull_request.number,
      username: context.payload.pull_request.user.login,
    };
  }

  throw new Error("This action must be run on a pull request event");
};
