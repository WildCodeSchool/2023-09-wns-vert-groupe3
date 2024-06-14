import * as RadixTabs from "@radix-ui/react-tabs";
import React from "react";

interface TabsProps {
  defaultValue?: string;
  children: React.ReactNode;
}

interface TabButtonProps {
  name: string;
  keyId: string;
}

interface TabItemProps {
  name: string;
  keyId: string;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ keyId, name }) => (
  <RadixTabs.Trigger
    value={keyId}
    className="font-bold data-[state=active]:text-primary"
  >
    {name}
  </RadixTabs.Trigger>
);

export const TabItem: React.FC<TabItemProps> = ({ children, keyId }) => (
  <RadixTabs.Content value={keyId}>{children}</RadixTabs.Content>
);

const Tabs: React.FC<TabsProps> = ({ children, defaultValue }) => {
  const tabItems = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === TabItem,
  );

  tabItems.forEach((tab: any) => {
    if (!tab.props.keyId || !tab.props.name) {
      throw new Error("TabItem component requires keyId and name props.");
    }
  });

  const tabsNames = tabItems.map((tab: any) => ({
    keyId: tab.props.keyId,
    name: tab.props.name,
  }));

  return (
    <RadixTabs.Root defaultValue={defaultValue} orientation="vertical">
      <RadixTabs.List className="mb-4 flex gap-8">
        {tabsNames.map((tab, index) => (
          <TabButton key={index} keyId={tab.keyId} name={tab.name} />
        ))}
      </RadixTabs.List>
      {tabItems}
    </RadixTabs.Root>
  );
};

export default Tabs;
