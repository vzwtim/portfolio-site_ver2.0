'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useEffect } from 'react';

import Image from 'next/image';
import ProjectMotionPreview from '@/components/ProjectMotionPreview';

interface App {
  name: string;
  description: string;
  url?: string;
  imageUrl: string;
  bgColor: string;
  workId?: string;
}

const apps: App[] = [
  {
    name: '東京の距離',
    description: '駅を中心に地理と時間の距離を行き来する、東京のインタラクティブマップ。',
    url: 'https://tokyo-timewarp.yudai-grex4.chatgpt.site/',
    imageUrl: '/images/portfolio/tokyo-time-warp.webp',
    bgColor: '#f1efe7',
    workId: 'tokyo-time-warp',
  },
  {
    name: 'Swift Revise',
    description: '不動産知識を気軽に復習できる一問一答アプリです。',
    url: 'https://swift-revise.vercel.app/',
    imageUrl: '/images/appview_quiz.png',
    bgColor: '#FAFAFA',
    workId: 'swift-revise',
  },
  {
    name: 'Drunk Scheduler',
    description: '飲み会のスケジュール調整を手早く行うためのWebアプリです。',
    url: 'https://drunk-scheduler.onrender.com/',
    imageUrl: '/images/appview_drunk.png',
    bgColor: '#FFECCE',
    workId: 'drunk-scheduler',
  },
  {
    name: 'Multi AI Chat',
    description: '複数のAIキャラクターと同時に会話できるマルチチャットです。',
    url: 'https://ai-simulation-one.vercel.app/',
    imageUrl: '/images/appview_chat.png',
    bgColor: '#212121',
    workId: 'multi-ai-chat',
  },
  {
    name: 'Portfolio Site',
    description: 'このポートフォリオサイトの初期バージョンです。',
    url: 'https://portfolio-site-ver1.vercel.app/',
    imageUrl: '/images/webview_portfolio.png',
    bgColor: '#008877',
    workId: 'portfolio-site-v1',
  },
  {
    name: 'UT architecture pavilion',
    description: '学生時代に製作したパビリオンを紹介するサイトです。',
    url: 'https://utarchipavilion202.wixsite.com/website',
    imageUrl: '/images/webview_pavilion.png',
    bgColor: '#DBC9BF',
    workId: 'pavilion-mayfes',
  },
  {
    name: 'Prop Proposals',
    description: '不動産プロジェクトの企画アイデアを素早く検証できるコンセプトサイトです。',
    url: 'https://prop-proposals.vercel.app/',
    imageUrl: '/images/webview_prop.png',
    bgColor: '#008877',
    workId: 'prop-proposals',
  },
  {
    name: 'Shuffle Lunch Matching',
    description: '社内メンバーをランダムにペアリングしてランチ交流を促す社内限定マッチングアプリです。',
    imageUrl: '/images/appview_shuffle.png',
    bgColor: '#0F9D65',
    workId: 'shuffle-lunch',
  },
];

const AppsPage: NextPage = () => {
  const { setBgColor, setTextColor } = useTheme();

  useEffect(() => {
    setBgColor('bg-white');
    setTextColor('text-gray-800');
    return () => {
      setBgColor('bg-white');
      setTextColor('text-[#008877]');
    };
  }, [setBgColor, setTextColor]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-900">My Apps & Sites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {apps.map((app) => (
          <div key={app.name} className="flex flex-col bg-white rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
            {app.workId === 'tokyo-time-warp' ? <ProjectMotionPreview image={app.imageUrl} href="/works/tokyo-time-warp" title={app.name} ratio="8 / 5" fit="contain" videoSrc="/videos/tokyo-time-warp-hover.mp4"><span className="sr-only">東京の距離の詳細を見る</span></ProjectMotionPreview> : <div
              className="relative h-56 w-full"
              style={{ backgroundColor: app.bgColor }}
            >
              <Image
                src={app.imageUrl}
                alt={app.name}
                fill
                className="object-contain"
              />
            </div>}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex-grow">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">{app.name}</h2>
                <p className="text-gray-600 mb-4">{app.description}</p>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold">
                {app.workId ? (
                  <Link
                    href={`/works/${app.workId}`}
                    className="text-[#008877] hover:text-[#00a78f] transition-colors"
                  >
                    My Works
                  </Link>
                ) : (
                  <span className="text-gray-400">My Works</span>
                )}
                {app.url ? (
                  <Link
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 group-hover:text-teal-600 transition-colors"
                  >
                    Visit Site &rarr;
                  </Link>
                ) : (
                  <span className="text-gray-400">Internal Only</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppsPage;

