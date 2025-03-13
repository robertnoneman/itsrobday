"use client";

import Link from 'next/link';
import { usePathname } from "next/navigation";
import { CloseButton, useClose } from '@headlessui/react';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export const NavBarItem = ({
	children,
	href,
}: {
	children: React.ReactNode;
	href: string;
}) => {
	const pathname = usePathname();
	const isActive = pathname === href;
	let close = useClose();
	return (
		<Link
			href={href}
			className={classNames(
				isActive ? 'bg-rose-600/40 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
				'rounded-md rounded-l-3xl rounded-r-3xl px-3 py-2 text-sm font-medium',
			)}
			onClick={(event) => {
				// event.preventDefault();
				close();
			}}
		>
			{children}
		</Link>
	);
};