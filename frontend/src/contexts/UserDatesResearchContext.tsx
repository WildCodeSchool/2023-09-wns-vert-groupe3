import { createContext, useContext, useState } from "react";

interface UserDatesResearchContextValue {
  dates: UserResearchDatesType;
  updateDates: (dates: { start: Date; end: Date }) => void;
  clearDates: () => void;
}

export type UserResearchDatesType = {
  start?: Date;
  end?: Date;
};

// Create the UserDatesResearch context
const UserDatesResearchContext = createContext<
  UserDatesResearchContextValue | undefined
>(undefined);

// Create a custom hook to access the UserDatesResearch context
export const useUserDatesResearch = (): UserDatesResearchContextValue => {
  const context = useContext(UserDatesResearchContext);
  if (!context) {
    throw new Error(
      "useUserDatesResearch must be used within a UserDatesResearchProvider",
    );
  }
  return context;
};

// Create the UserDatesResearchProvider component
export const UserDatesResearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dates, setDates] = useState<UserResearchDatesType>({
    start: new Date(Date.parse("2024-05-18")),
    end: new Date(Date.parse("2024-05-21")),
  });

  const updateDates = (dates: { start: Date; end: Date }) => {
    setDates((prevDates) => ({
      ...prevDates,
      ...dates,
    }));
  };

  const clearDates = () => {
    setDates({
      start: undefined,
      end: undefined,
    });
  };

  return (
    <UserDatesResearchContext.Provider
      value={{
        dates,
        updateDates,
        clearDates,
      }}
    >
      {children}
    </UserDatesResearchContext.Provider>
  );
};
