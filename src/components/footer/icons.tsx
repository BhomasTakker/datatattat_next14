import { BsTwitterX } from "react-icons/bs";
import { TfiReddit } from "react-icons/tfi";
import { FaSpotify } from "react-icons/fa";
import { FaMixcloud } from "react-icons/fa6";
import { FaThreads } from "react-icons/fa6";
import { FaBluesky } from "react-icons/fa6";
import { FaTumblr } from "react-icons/fa";
import { FaFlickr } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaTwitch } from "react-icons/fa6";
import { BsSubstack } from "react-icons/bs";

import styles from "./icons.module.scss";

import Link from "next/link";

export const iconsList = [
	{
		link: "https://x.com/datatattat",
		icon: BsTwitterX,
	},
	{
		link: "https://www.reddit.com/user/datatattat/",
		icon: TfiReddit,
	},
	// {
	// 	link: "https://www.youtube.com/@RickAstleyYT",
	// 	icon: FaYoutube,
	// },
	{
		link: "https://open.spotify.com/user/31f53zn4qds7oykh55x5ps735qoi",
		icon: FaSpotify,
	},
	{
		link: "https://www.mixcloud.com/datatattat/",
		icon: FaMixcloud,
	},
	// {
	// 	link: "https://www.instagram.com/jeremycorbyn/",
	// 	icon: FaInstagram,
	// },
	{
		link: "https://www.threads.net/@elonmusksjet",
		icon: FaThreads,
	},
	// {
	// 	link: "https://www.facebook.com/AntifaAustralia/",
	// 	icon: FaFacebook,
	// },
	{
		link: "https://bsky.app/profile/datatattat.bsky.social",
		icon: FaBluesky,
	},
	{
		link: "https://www.twitch.tv/datatattat",
		icon: FaTwitch,
	},
	// {
	// 	link: "https://www.reddit.com/user/datatattat/",
	// 	icon: FaSnapchat,
	// },
	{
		link: "https://www.tiktok.com/@datatattat",
		icon: FaTiktok,
	},
	{
		link: "https://www.flickr.com/people/201123085@N06/",
		icon: FaFlickr,
	},
	{
		link: "https://www.tumblr.com/blog/datatattat",
		icon: FaTumblr,
	},
	{
		link: "https://substack.com/@datatattat",
		icon: BsSubstack,
	},
];

export const Icons = () => {
	return (
		<div className={styles.root}>
			{iconsList.map(({ link, icon: Icon }, i) => (
				<Link href={link} key={i}>
					<Icon className={styles.icon} />
				</Link>
			))}
		</div>
	);
};
