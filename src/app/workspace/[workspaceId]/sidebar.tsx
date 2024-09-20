"use client";

import { UserButton } from '@/features/auth/components/user-button'
import { WorkspaceSwitcher } from './workspace-switcher'
import { SidebarButton } from './sidebar-button'
import { BellIcon, Home, HomeIcon, MessageSquareIcon, MoreHorizontalIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const Sidebar = () => {
  const pathName = usePathname();

  return (
    <aside className='w-[70px] h-full bg-slack-purple-3 flex flex-col gap-y-4 items-center pt-[9x]'>
      <WorkspaceSwitcher />
      <SidebarButton icon={HomeIcon} label='Home' isActive={pathName.includes("/workspace")} />
      <SidebarButton icon={MessageSquareIcon} label='DMs' />
      <SidebarButton icon={BellIcon} label='Activity' />
      <SidebarButton icon={MoreHorizontalIcon} label='More' />

      <div className='flex flex-col items-center justify-center gap-y-1 mt-auto'>
        <UserButton />
      </div>
    </aside>
  )
}
