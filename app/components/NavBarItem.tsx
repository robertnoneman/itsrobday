"use client";

import Link from 'next/link';
import { usePathname } from "next/navigation";

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
	return (
		<Link
			href={href}
			className={classNames(
				isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
				'rounded-md px-3 py-2 text-sm font-medium',
			)}
		>
			{children}
		</Link>
	);
};