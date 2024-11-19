'use client'
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FilterUsers from '@/components/FilterUsers';
import SharedWithMe from '@/components/SharedWithMe';

const Page = () => {
const [active,useActive] = useState(1);
  return (
    <div className='w-full h-full p-(-5) m-0'>
    <Tabs defaultValue="account" className="w-full h-full">
      <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger
            value="account"
            className={`${active === 1 ? 'text-[1.2rem] shad-active' : ''}`}
            onClick={() => useActive(1)}
          >
            Shared With Me
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className={`${active === 2 ? 'text-[1.2rem] shad-active' : ''}`}
            onClick={() => useActive(2)}
          >
            Explore Users
          </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="h-full ">
        <SharedWithMe />
      </TabsContent>
      <TabsContent value="password" className="h-full">
        <FilterUsers/>
      </TabsContent>
    </Tabs>
    </div>
  );
};

export default Page;
