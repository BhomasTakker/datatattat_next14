"use client";
import { useState } from "react";
import { LOGO_SQUARE_CROPPED } from "@/lib/assets/constants";

type AvatarImageProps = {
	src?: string;
	alt: string;
	className?: string;
};

export const AvatarImage = ({ src, alt, className }: AvatarImageProps) => {
	const [avatarSrc, setAvatarSrc] = useState(src || LOGO_SQUARE_CROPPED);

	return (
		<img
			className={className}
			src={avatarSrc}
			alt={alt}
			onError={() => setAvatarSrc(LOGO_SQUARE_CROPPED)}
		/>
	);
};
