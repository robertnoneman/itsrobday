import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { HiBars3 } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";
import { NavBarItem } from './NavBarItem';
import Image from 'next/image';

const navigation = [
	{ name: 'Home', href: '/', current: true },
	{ name: 'Stats', href: '/dashboard', current: false },
	{ name: 'Activities', href: '/activities', current: false },
	{ name: 'Calendar', href: '/calendar', current: false },
	{ name: "Archive", href: "/archive", current: false },
	{ name: "Games", href: "/games", current: false },
]


export default function NavBar() {
	
	
	return (
		<div className="backdrop-blur top-[0px] fixed w-full z-10 row-start-1">
		<Disclosure as="nav" >
			<div className="bg-transparent mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-14 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						{/* Mobile menu button*/}
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<HiBars3 aria-hidden="true" className="block size-6 group-data-open:hidden" />
							<HiXMark aria-hidden="true" className="hidden size-6 group-data-open:block" />
						</DisclosureButton>
					</div>
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						{/* <div className="flex shrink-0 items-center bg-stone-950/50 rounded-full p-1">
							<Image
								alt="ItsRobDay"
								src="/RobdayIcon.png"
								className="h-8 w-auto right-[1px]"
								width={32}
								height={32}
							/>
						</div> */}
						<div className="hidden sm:ml-6 sm:block ">
							<div className="flex space-x-4">
								{navigation.map((item) => (
									<NavBarItem
										key={item.name}
										href={item.href}
										>
										{item.name}
										</NavBarItem>
								))}
							</div>
						</div>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						

						{/* Profile dropdown */}
						<Menu as="div" className="relative ml-3">
							<div>
								<MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
									<span className="absolute -inset-1.5" />
									<span className="sr-only">Open user menu</span>
									<Image
										alt=""
										src="/robN_avatar.png"
										className="size-8 rounded-full"
										width={32}
										height={32}
									/>
								</MenuButton>
							</div>
							<MenuItems
								transition
								className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-950 py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
							>
								<MenuItem>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-400 data-focus:bg-gray-100 data-focus:outline-hidden"
									>
										Your Profile
									</a>
								</MenuItem>
								<MenuItem>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-400 data-focus:bg-gray-100 data-focus:outline-hidden"
									>
										Settings
									</a>
								</MenuItem>
								<MenuItem>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-400 data-focus:bg-gray-100 data-focus:outline-hidden"
									>
										Sign out
									</a>
								</MenuItem>
							</MenuItems>
						</Menu>
					</div>
				</div>
			</div>

			<DisclosurePanel transition className="transform transition data-closed:-translate-y-full duration-350 ease-in-out sm:hidden backdrop-blur">
				<div className="space-y-1 px-2 pt-2 pb-3 flex flex-col">
					{navigation.map((item) => (
						<NavBarItem
							key={item.name}
							href={item.href}
						>
							{item.name}
							</NavBarItem>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
		</div>
	)
}