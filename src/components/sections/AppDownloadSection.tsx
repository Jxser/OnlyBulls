'use client';

import { AppDownloadProps } from '@/types';
import {
  DevicePhoneMobileIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

export default function AppDownloadSection({
  appStoreUrl = 'https://apps.apple.com/us/app/onlybulls/id6746166943',
  playStoreUrl = 'https://play.google.com/store/apps/details?id=com.askroi.onlybulls&pli=1',
  askRoiUrl = 'https://askroi.com',
  aultNodesUrl = 'https://aultnodes.com/',
  className = '',
}: AppDownloadProps) {
  const handleAppStoreClick = () => {
    window.open(appStoreUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePlayStoreClick = () => {
    window.open(playStoreUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAskRoiClick = () => {
    window.open(askRoiUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAultNodesClick = () => {
    window.open(aultNodesUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-black ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <div className="mb-12">
          <DevicePhoneMobileIcon className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Get Only Bulls on Your Mobile Device
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Take your AI-powered trading assistant with you wherever you go.
            Available now on iOS and Android.
          </p>
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          {/* iOS App Store Button */}
          <button
            onClick={handleAppStoreClick}
            className="group flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-4 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="Download Only Bulls from the Apple App Store"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-200">Download on the</div>
              <div className="text-lg font-semibold">App Store</div>
            </div>
            <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Google Play Store Button */}
          <button
            onClick={handlePlayStoreClick}
            className="group flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="Download Only Bulls from Google Play Store"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-200">Get it on</div>
              <div className="text-lg font-semibold">Google Play</div>
            </div>
            <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Company Branding Section */}
        <div className="border-t border-gray-800 pt-12">
          <div className="space-y-6">
            {/* Powered by AskROI */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-300">
              <span className="text-lg">Powered by</span>
              <button
                onClick={handleAskRoiClick}
                className="group inline-flex items-center gap-2 text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                aria-label="Visit AskROI.com website"
              >
                AskROI.com
                <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Ault Nodes Company Reference */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-400">
              <span>A product by</span>
              <button
                onClick={handleAultNodesClick}
                className="group inline-flex items-center gap-2 font-medium text-gray-200 hover:text-white transition-colors"
                aria-label="Visit Ault Nodes company website"
              >
                Ault Nodes
                <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Additional Trust Signals */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Available on iOS & Android</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>AI-Powered Trading</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
