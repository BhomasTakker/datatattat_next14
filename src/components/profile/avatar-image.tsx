"use client";
import { useState } from "react";

type AvatarImageProps = {
	src?: string;
	alt: string;
	className?: string;
};

export const AvatarImage = ({ src, alt, className }: AvatarImageProps) => {
	const [avatarSrc, setAvatarSrc] = useState(src || "/assets/logo-square.png");

	return (
		<img
			className={className}
			src={avatarSrc}
			alt={alt}
			onError={() => setAvatarSrc("/assets/logo-square.png")}
		/>
	);
};
