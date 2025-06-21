'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <div className="relative">
      {/* 第一个板块 - 视频背景 */}
      <section className="relative h-screen overflow-hidden">
        {/* 视频背景 */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/HomePageBackground.mp4" type="video/mp4" />
          </video>
          {/* 视频遮罩层 */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* 中央激情文字 */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-8xl mx-auto px-8">
            <h1 className="text-7xl md:text-9xl lg:text-11xl xl:text-12xl font-black text-white mb-8 tracking-tight leading-none font-anton">
              <span className="text-white-border">
                DISCIPLINE GIVES ME FREEDOM
              </span>
            </h1>
            
            {/* 滚动提示 */}
            <div className="mt-20 animate-bounce">
              <div className="w-8 h-12 border-3 border-white rounded-full mx-auto flex justify-center">
                <div className="w-2 h-4 bg-white rounded-full mt-3 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 第二个板块 - #9b9490背景 */}
      <section className="relative h-screen bg-[#9b9490] flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* 左侧内容 */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6 font-anton tracking-tight">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    WELCOME
                  </span>
                  <br />
                  TO GGYM
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  欢迎来到GGym健身平台，这里是你的健身之旅的起点。我们致力于为你提供最专业的健身指导、最先进的设备设施和最贴心的服务体验。
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-lg">专业教练团队，个性化训练计划</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-lg">先进设备设施，安全训练环境</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-lg">智能管理系统，科学数据追踪</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-lg">24/7开放时间，灵活训练安排</span>
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-full hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
                  开始你的健身之旅
                </button>
              </div>
            </div>

            {/* 右侧内容 */}
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 font-bebas-neue tracking-wide">
                  WHY CHOOSE GGYM?
                </h3>
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  我们不仅仅是一个健身房，更是一个改变生活的地方。在这里，每一次训练都是向更好的自己迈进的一步。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl mb-3">💪</div>
                  <h4 className="text-white font-bold text-lg mb-2">专业指导</h4>
                  <p className="text-white/80">资深教练团队，为你量身定制训练计划</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl mb-3">🏋️</div>
                  <h4 className="text-white font-bold text-lg mb-2">先进设备</h4>
                  <p className="text-white/80">配备最新健身设备，确保训练效果</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="text-white font-bold text-lg mb-2">数据追踪</h4>
                  <p className="text-white/80">智能系统记录你的每一次进步</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl mb-3">⏰</div>
                  <h4 className="text-white font-bold text-lg mb-2">灵活时间</h4>
                  <p className="text-white/80">24小时开放，适应你的时间安排</p>
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
                  了解更多
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
