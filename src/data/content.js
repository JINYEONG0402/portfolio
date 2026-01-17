
export const heroSlides = {
    ko: [
        {
            id: 1,
            title: "안녕하세요",
            content: "고진영의 포트폴리오 입니다",
            image: "/media/code.jpg",
            align: "center",
            brightness: 0.6
        },
        {
            id: 2,
            title: "Projects",
            content: "제가 진행한 다양한 프로젝트를 확인해보세요.",
            image: "/media/C.jpg",
            align: "center",
            brightness: 0.6,
            buttonText: "프로젝트 바로가기",
            link: "/project"
        },
        {
            id: 3,
            title: "더 자세한 사항은...",
            content: "궁금한 점이 있으시다면 언제든 연락주세요.",
            image: "/media/people.jpg",
            align: "center",
            brightness: 0.6,
            buttonText: "문의하기",
            link: "/contact"
        }
    ],
    en: [
        {
            id: 1,
            title: "Hello",
            content: "I am Jinyoung Ko, a Developer.",
            image: "/media/code.jpg",
            align: "center",
            brightness: 0.6
        },
        {
            id: 2,
            title: "Projects",
            content: "Explore the various projects I have worked on.",
            image: "/media/C.jpg",
            align: "center",
            brightness: 0.6,
            buttonText: "View Projects",
            link: "/project"
        },
        {
            id: 3,
            title: "Contact Me",
            content: "If you have any questions, please feel free to contact me.",
            image: "/media/people.jpg",
            align: "center",
            brightness: 0.6,
            buttonText: "Contact Me",
            link: "/contact"
        }
    ]
};

export const projects = {
    ko: [
        {
            id: "java-puzzle-game",
            title: "Java를 이용한 퍼즐 게임 만들기",
            date: "2023-06-02",
            summary: "Java Swing과 AWT를 활용한 커스텀 이미지 퍼즐 게임",
            description: `Java Swing과 AWT를 기반으로 개발한 이미지 슬라이드 퍼즐 게임입니다. MVC 패턴을 고려하여 시작 화면(StartWindow), 게임 로직(Game), 메인 컨테이너(GameWindow)로 구조화했으며, 사용자가 원하는 이미지를 직접 업로드하여 퍼즐로 즐길 수 있는 커스터마이징 기능을 구현했습니다.

**주요 기능 및 기술적 특징**
1. **커스텀 이미지 처리 (ImageIO & BufferedImage)**
사용자가 선택한 이미지 파일(JPG, PNG)을 \`ImageIO\`로 읽어온 뒤, 선택한 난이도(3x3, 4x4, 5x5)에 맞춰 격자 형태로 자르고 \`ArrayList\`에 저장하여 관리합니다. 이를 통해 어떤 이미지든 즉시 퍼즐 게임으로 변환할 수 있습니다.

\`\`\`java
// 이미지를 난이도(row)에 맞춰 분할하는 핵심 로직
for (int x = 0; x < row; x++) {
    for (int y = 0; y < row; y++) {
        if (x + 1 == row && y + 1 == row) {
            emptyX = x; emptyY = y; // 마지막 칸은 빈칸(Empty) 설정
        } else {
            // 원본 이미지(image)에서 해당 격자만큼을 잘라내어 리스트에 저장
            picList.add(image.getSubimage(y * imageSize + imageBeginX, 
                                        x * imageSize + imageBeginY,
                                        imageSize, imageSize));
        }
    }
}
\`\`\`

2. **퍼즐 무결성 알고리즘 (Inversion Counting)**
단순한 랜덤 섞기는 '풀 수 없는 퍼즐'을 생성할 위험이 있습니다. 이를 방지하기 위해 **Inversion Counting(역전 계수) 알고리즘**을 도입했습니다. 퍼즐을 섞는 과정에서 Inversion 수를 계산하여, 해당 퍼즐이 수학적으로 풀이 가능한 상태인지, 그리고 설정된 난이도(상/중/하)에 적합한 복잡도를 가지는지 검증한 후 게임을 시작하도록 설계했습니다.

\`\`\`java
// Inversion(역전) 수 계산을 통한 퍼즐 풀이 가능 여부 판별
int inversion = 0;
for(int i = 0; i < arr.length-1; i++) {
    int temp = arr[i];
    for(int j = i+1; j < arr.length; j++) {
        // 자신의 뒤에 있는 숫자들 중 자신보다 작은 수의 개수를 카운트
        if(temp > arr[j]) inversion++;
    }
}

// 난이도별 적정 복잡도 검증
if(level == 1) { // 하
    if(row == 3 && inversion == 7) break; 
} else if(level == 2) { // 중
    if(row == 3 && inversion == 13) break;
}
\`\`\`

3. **이벤트 기반 상호작용 (MouseListener & Graphics)**
\`MouseListener\`를 통해 사용자의 클릭 좌표를 계산하여 타일을 이동시키며, \`paintComponent\` 메서드를 오버라이딩하여 게임의 실시간 상태 변화를 그래픽으로 렌더링했습니다.

4. **사용자 경험 (UX)**
배경음악(BGM) 및 효과음 재생을 위한 오디오 처리, 성공 시 축하 메시지 출력, 그리고 난이도 조절 팝업 등 직관적인 UI/UX를 제공하여 게임의 완성도를 높였습니다.

5. **타이머 및 스레드 제어 (Thread & Runnable)**
게임 플레이 시간을 실시간으로 기록하기 위해 **Thread와 Runnable**을 활용했습니다. 1초마다 초 단위를 증가시키는 타이머 스레드를 별도로 실행하여 메인 UI 스레드와 비동기적으로 동작하도록 구현했으며, 게임 재시작 시 기존 스레드를 \`interrupt()\` 하여 종료하고 새로운 스레드를 시작하는 방식으로 자원 관리와 정확한 시간 측정을 보장했습니다.

\`\`\`java
// 별도의 스레드에서 1초마다 타이머 갱신
public void run() {
    while (true) {
        timerLabel.setText(Integer.toString(n));
        n++;
        try {
            Thread.sleep(1000); // 1초 대기
        } catch (InterruptedException e) {
            return; // 스레드 인터럽트 시 종료
        }
    }
}

// 게임 재시작 시 기존 스레드 정리 및 재생성
public void resetTimer() {
    if (th != null && th.isAlive()) {
        th.interrupt(); // 기존 스레드 중단
    }
    th = new Thread(new TimerRunnable(timeLabel));
    th.start();
}
\`\`\`
`,
            image: "/media/java_puzzle.jpg",
            tags: ["Java", "Swing", "AWT", "Student Project"]
        },
        {
            id: "movie-website",
            title: "TMDB를 사용한 영화사이트 만들기",
            date: "2024-11",
            summary: "TMDB를 활용하여 나만의 영화사이트 만들기",
            description: `본 프로젝트는 TMDB(The Movie Database)에서 제공하는 영화 정보 API를 활용하여 영화 정보를 조회하고, 사용자별 관심 영화 목록을 관리할 수 있는 영화 웹사이트를 구축하였습니다.

1. **서비스 레이어 분리를 통한 객체지향적 아키텍처 설계**
UI 컴포넌트와 비즈니스 로직을 엄격히 분리하여 코드의 재사용성과 유지보수성을 극대화했습니다. 특히 URLService, AuthService, WishList를 독립적인 클래스로 모듈화하여 관리하는 Service Layer 패턴을 적용했습니다.

[핵심 코드 - URLService.ts]

\`\`\`typescript
export class URLService {
  private readonly API_KEY = process.env.VUE_APP_TMDB_API_KEY;
  private readonly BASE_URL = process.env.VUE_APP_TMDB_BASE_URL;

  // 비동기 통신 로직을 모듈화하여 컴포넌트 간 재사용성 확보
  async fetchFeaturedMovie(): Promise<Movie> {
    const response = await axios.get(
      \u0024{this.BASE_URL}/movie/popular?api_key=\u0024{this.API_KEY}&language=ko-KR
    );
    return response.data.results[0] as Movie;
  }

  // 동적 엔드포인트 생성을 캡슐화하여 유지보수 용이성 증대
  getURL4GenreMovies(genre: string, page = 1): string {
    return \u0024{this.BASE_URL}/discover/movie?api_key=\u0024{this.API_KEY}&with_genres=\u0024{genre}&language=ko-KR&page=\u0024{page};
  }
}
export const urlService = new URLService();
\`\`\`

2. **사용자별 독립적 데이터 퍼시스턴스 (Auth & Wishlist)**
카카오 로그인 토큰을 식별자로 활용하여 localStorage에 사용자별로 독립적인 위시리스트를 저장하도록 구현했습니다. 다중 사용자 환경을 고려하여 각 사용자 키(movieWishlist_\u0024{userId})에 맞춤형 데이터를 바인딩함으로써 개인화된 서비스 경험을 제공합니다.

[핵심 코드 - AuthService.ts & WishList.ts]

\`\`\`typescript
// 인증 상태 관리 클래스
export class AuthService {
  static isLoggedIn(): boolean {
    return !!localStorage.getItem("Kakao-Token"); // 토큰 유무로 상태 판단
  }
}

// 사용자별 위시리스트 관리 로직
private saveWishlist(): void {
  const userId = localStorage.getItem("Kakao-Token"); // 사용자 고유 식별자 활용
  if (!userId) return;

  // 사용자별 독립적인 키값으로 저장하여 데이터 무결성 유지
  localStorage.setItem(\`movieWishlist_\u0024{userId}\`, JSON.stringify(this.wishlist.value));
}
\`\`\`

3. **TMDB API 기반 실시간 데이터 렌더링 및 동적 필터링**
TMDB(The Movie Database) API를 활용하여 실시간 영화 정보를 수집하고, 인기 영화 및 최신 영화 등 다양한 카테고리별 데이터를 동적으로 렌더링합니다. Axios를 통해 비동기 처리를 최적화하고 인터페이스 기반의 데이터 처리를 수행합니다.

**[주요 구현 방식]**
- **홈 화면 구성**: 메인 배너 및 인기/최신 영화 목록의 자동 로드 로직 구현.
- **동적 필터링**: 장르 및 상영 정보에 따른 엔드포인트 분기 처리를 통해 유연한 데이터 요청 구조 설계.

**🛠 기술 스택 요약 (Tech Stack)**
- **Frontend**: Vue.js (Vue 3, Composition API), TypeScript
- **State & Data**: Axios, LocalStorage (Custom Persistence)
- **API**: TMDB (The Movie Database) API
- **Environment**: 환경 변수(.env)를 활용한 API Key 보안 관리`,
            image: "/media/movie_project.png",
            tags: ["Vue.js", "TMDB API", "Frontend"],
            link: "https://jymovie.netlify.app/"
        },
        {
            id: "ai-lecture-agent",
            title: "AI 강사 Agent 구축",
            date: "2025.12",
            summary: "PPT만 업로드하면 자동으로 강의 영상을 제작하는 AI 강사 Agent.",
            description: `본 프로젝트는 PPT만 업로드하면 자동으로 강의 영상을 제작하는 AI 강사 Agent를 설계·구현하는 것입니다. 이 시스템은 슬라이드 분석, 음성 생성(TTS), 영상 렌더링, 최종 강의 영상 병합까지의 전 과정을 자동화하는 것을 목표로 합니다.

1. **LangGraph 기반의 상태 중심 AI 에이전트 워크플로우 설계**
복잡한 미디어 생성 공정을 단방향 파이프라인이 아닌, 상태(State)를 공유하고 스스로 흐름을 결정하는 그래프 기반 에이전트로 설계했습니다. 각 노드는 독립적인 기능을 수행하며, 조건부 엣지를 통해 상황에 맞는 동적 경로를 선택합니다.

\`\`\`python
# LangGraph를 이용한 유기적 프로세스 구축
builder = StateGraph(State)
builder.add_node('parse_all', node_parse_all)      # PPT 데이터 추출
builder.add_node('gen_script_ctx', node_generate_script_with_context) # GPT 기반 대본 생성
builder.add_node('tts', node_tts)                 # OpenAI TTS 변환
builder.add_node('make_video', node_make_video)   # 개별 슬라이드 영상 제작
builder.add_node('concat', node_concat)           # 최종 영상 병합

# 조건부 분기(Conditional Edges)를 통한 흐름 제어
builder.add_conditional_edges(
    "decide_comment",
    decide_next_node, # 집중도에 따라 일침/격려/일반 모드 결정
    {"spicy_comment": "spicy_comment", "sweet_comment": "sweet_comment", "tts_mp3": "tts"}
)
\`\`\`

2. **GPT-4o 기반 멀티모달 컨텐츠 분석 및 스크립트 고도화**
GPT-4o-mini 모델을 활용하여 슬라이드 내의 텍스트, 표, 이미지 바이너리를 동시에 분석(Multimodal)하고 요약합니다. 특히 SerpApi를 이용한 웹 검색 컨텍스트를 결합하여, 단순 요약을 넘어 전문적인 강의 해설 스크립트를 생성합니다.

\`\`\`python
# 이미지와 텍스트를 동시에 처리하는 멀티모달 프롬프트 구성
messages = [
    {"role": "system", "content": "너는 PPT 요약 전문가야."},
    {"role": "user", "content": [
        {"type": "text", "text": json.dumps(slide["texts"])}, # 슬라이드 텍스트
        *[{"type": "image_url", "image_url": {"url": img_to_data_url(p)}} for p in slide["images"]] # 슬라이드 내 이미지
    ]}
]
model = client.chat.completions.create(model="gpt-4o-mini", messages=messages)
\`\`\`

3. **미디어 합성 알고리즘 및 자동 자막(SRT) 생성**
정지 이미지(PPT 스냅샷)와 음성을 FFmpeg로 합성하여 영상화합니다. 특히 문장별 글자 수 비율에 따른 시간 배분 알고리즘을 직접 구현하여, 음성과 일치하는 SRT 자막을 생성하고 영상에 실시간으로 입히는(Hard-coding) 기술을 적용했습니다.

\`\`\`python
def build_srt_from_script(script, audio_path, out_srt):
    total_dur = ffprobe_duration(audio_path) # 오디오 길이 측정
    lengths = [len(re.sub(r"\s+", "", s)) for s in sentences] # 문장별 가중치 계산
    
    # 가중치 기반 시간 배분 알고리즘 적용
    for sent, dur in zip(sentences, adj_durs):
        lines.append(f"{sec_to_timestamp(start)} --> {sec_to_timestamp(end)}")
        lines.append(sent)

# FFmpeg를 이용한 이미지 + 오디오 + 자막 합성
vf = f"scale=1920:1080,subtitles='{subtitles_path}'"
subprocess.check_call(["ffmpeg", "-loop", "1", "-i", image_path, "-i", audio_path, "-vf", vf, ...])
\`\`\`

4. **수강생 집중도 관리를 위한 '일침/격려' 이벤트 엔진**
강의의 단조로움을 깨기 위해 특정 시점(예: 4번째 슬라이드 등)에 수강생의 심리 상태를 추론하여 독설(Spicy) 또는 따뜻한 위로(Sweet) 멘트를 추가하는 기능을 구현했습니다. 이는 단순한 정보 전달을 넘어 강사 페르소나를 가진 에이전트로서의 가치를 높입니다.

\`\`\`python
def node_spicy_comment(state: State) -> State:
    sys_prompt = "너는 직장인 대상 AI 강사야. 현실적이고 직설적인 쓴소리로 수강생의 정신을 번쩍 들게 해줘."
    # ... GPT를 통해 현재 스크립트 문맥에 맞는 독설 생성 후 기존 스크립트에 결합
    combined_script = script.strip() + "\n\n" + spicy_comment
    state["slides"][idx]["script"] = combined_script
    return state
\`\`\`

5. **Gradio 기반의 실시간 인터랙티브 서비스 인터페이스 구현**
백엔드에서 수행되는 복잡한 app.stream 로직을 사용자가 직관적으로 확인할 수 있도록 Gradio 웹 대시보드를 구축했습니다. 진행률 표시줄(Progress Bar)을 통해 각 노드별 진행 상황을 실시간 스트리밍하고, 최종 영상의 미리보기 및 다운로드 기능을 제공하여 End-to-End 서비스 완성도를 높였습니다.

\`\`\`python
# Gradio를 통한 에이전트 실행 및 실시간 상태 업데이트
def run_pipeline_ui(pptx_file, tone, voice, auto_clean, progress=gr.Progress()):
    # LangGraph의 stream 기능을 활용하여 노드별 진행 상황을 UI에 전달
    for event in app.stream(initial_state):
        for node_name, node_state in event.items():
            cur_slide = node_state.get("slide_index", 0)
            # Gradio Progress Bar 실시간 업데이트
            progress(ratio, desc=f"[{node_name}] 슬라이드 {cur_slide+1} 처리 중...")

# Gradio UI 레이아웃 구성
with gr.Blocks(css=CUSTOM_CSS) as demo:
    inp_ppt = gr.File(label="PPTX 업로드")
    run_btn = gr.Button("실행", variant="primary")
    out_video = gr.Video(label="최종 강의 영상")
    out_summary = gr.Markdown(label="생성 결과 요약")
\`\`\`

이 프로젝트를 통해 반복적이고 시간이 많이 소요되는 강의 제작 과정을 자동화함으로써, 강의자나 교육 기관이 더 빠르고 효율적으로 콘텐츠를 생산할 수 있는 기반을 마련했습니다.`,
            image: "/media/ai_agent_01.png",
            tags: ["AI", "Python", "LangGraph", "FFmpeg"],
            link: "https://drive.google.com/file/d/1nQBkg7uhSK4_EfHFJAAebcRIrK3bfGDY/view?usp=sharing"
        },
        {
            id: "android-restaurant-app",
            title: "코틀린을 이용하여 안드로이드 맛집 어플 만들기",
            date: "2023.12",
            summary: "전북대학교 맛집 추천 앱으로 랜덤 추천, 위시리스트, 친구 추가 기능을 통해 사용자에게 개인화된 경험을 제공합니다. MySQL과 PHP API를 활용하여 맛집 정보를 관리하고, 카카오 API로 맛집 검색 및 위치 표시 기능을 포함하여 직관적인 사용자 인터페이스를 구현",
            description: `전북대학교 맛집 추천 앱으로 랜덤 추천, 위시리스트, 친구 추가 기능을 통해 사용자에게 개인화된 경험을 제공합니다.MySQL과 PHP API를 활용하여 맛집 정보를 관리하고, 카카오 API로 맛집 검색 및 위치 표시 기능을 포함하여 직관적인 사용자 인터페이스를 구현
            
이 프로젝트는 기존 맛집 어플과의 차별성을 강조하고, 사용자 친화적인 기능을 제공하는 것을 목표로 합니다.앱의 주요 기능으로는 랜덤 추천 기능이 있습니다.이를 통해 전북대 제휴 음식점을 무작위로 추천하여 사용자의 선택의 폭을 넓힙니다.또한, 위시리스트 기능을 도입하여 사용자가 선호하는 맛집을 저장하고 관리할 수 있도록 하여 개인화된 경험을 제공합니다.친구 추가 기능은 사용자가 친구를 추가하고 서로의 맛집 정보를 공유할 수 있는 시스템을 구축합니다.

알림 시스템도 설계되어 실시간 공지사항을 통해 새로운 소식을 즉시 전달합니다.기술 스택으로는 MySQL 데이터베이스와 PHP API를 사용하여 맛집 정보를 저장하고 관리합니다.카카오 API를 활용하여 맛집 정보를 검색하고 지도에서 위치를 표시하는 기능도 포함됩니다.사용자 인터페이스는 직관적이고 사용자 친화적으로 설계되어 로그인 및 회원가입 절차가 간편합니다.

맛집 리스트는 필터 기능을 통해 사용자가 원하는 맛집을 쉽게 찾을 수 있도록 하며, 상세 페이지에서는 클릭한 맛집의 정보를 상세히 제공합니다.리뷰 작성 기능은 사용자 간의 상호작용을 유도하며, 리뷰 내용을 저장하고 표시할 수 있는 시스템을 구현합니다.이러한 기능을 통해 전북대학교 맛집 추천 앱은 사용자가 편리하게 맛집 정보를 검색하고 공유할 수 있는 플랫폼을 제공하는걸 목표로 했습니다.`,
            image: "/media/android_project.png",
            tags: ["Android", "Kotlin", "MySQL", "PHP"]
        },
        {
            id: "aws-deployment",
            title: "aws를 통한 자동배포 환경 구축",
            date: "2025-12",
            summary: "EC2, ALB, Nginx를 활용한 고가용성 프론트엔드/백엔드 배포 아키텍처 구축",
            description: `aws를 통한 자동배포 환경 구축

1. **전체 아키텍처 구성**
   - **프론트엔드**: EC2 1대
   - **백엔드**: EC2 2대 + ALB (AZ 분산)
   - **프론트 - 백엔드 연결**: Nginx Reverse Proxy + ALB DNS

![AWS Architecture](/media/aws_architecture.png)

2. **프론트 - 백엔드 연결 방식**
   - 프론트엔드 배포 시 백엔드 ALB DNS 주소를 환경변수로 주입
   - Nginx Reverse Proxy를 통해 /api 요청을 백엔드 ALB로 전달

3. **자동화 ci/cd파이프라인 설계**
코드 변경 시 개발자의 개입 없이 자동 배포되도록 했습니다. 빌드와 배포 로직을 명확히 분리되도록 설계했습니다. (buildspec.yml, appspec.yml)

![CI/CD Pipeline](/media/aws_cicd.png)

4. **롤링 배포기반 무중단 배포**
**📌 롤링 배포 방식**
- 한 번에 모든 서버 중단 X
- EC2 인스턴스를 한 대씩 순차적으로 업데이트
- 최소 EC2 개수인 2대로 백엔드 서버 구성
- 
**📌 무중단 배포**
- 배포 중인 인스턴스는 ALB의 타겟 그룹에서 일시적으로 제외
- 나머지 인스턴스가 사용자 요청을 계속 처리

![Rolling Deployment](/media/aws_rolling.png)

5. **Load Balancer 흐름**
**📌 ALB 요청 처리 과정**
- 사용자 요청이 ALB로 전달
- ALB는 타겟 그룹에 등록된 EC2 상태 지속적으로 확인
- 정상(Healthy) 상태의 인스턴스에만 트래픽 분산

**EC2 인스턴스 최소 개수(2대) 유지 및 상태 관리**
자동 확장보다는 무중단 배포와 장애 복구 목적으로 사용을 위해 Auto Scaling Group을 사용

![Load Balancer Flow](/media/aws_alb.png)

6. **수동 스테이지 설정**
수동 승인 단계 구성된 최종 파이프라인

![Manual Approval Pipeline](/media/aws_approval.png)

7. **백엔드 - 프론트엔드 연결**
**📌 Nginx Proxy 이용 프론트엔드 - 백엔드 연결**
- 프론트엔드 서버의 Nginx가 API 요청을 백엔드 ALB로 전달
- 프록시 구조를 통해 프론트와 백엔드를 분리하여 안정적인 통신 환경 구성

![Nginx Config](/media/nginx_config.png) ![Nginx Log](/media/nginx_log.png)`,
            image: "/media/aws_main.png",
            tags: ["AWS", "EC2", "Nginx", "CI/CD"]
        }
    ],
    en: [
        {
            id: "java-puzzle-game",
            title: "Puzzle Game using Java",
            date: "2023-06-02",
            summary: "Custom image puzzle game using Java Swing and AWT",
            description: `This is an image slide puzzle game developed based on Java Swing and AWT. Structured with the MVC pattern considering StartWindow, Game logic, and GameWindow (main container), it implements a customizing feature that allows users to upload their own images to enjoy the puzzle.

**Key Features and Technical Characteristics**
1. **Custom Image Processing (ImageIO & BufferedImage)**
Reads the image file (JPG, PNG) selected by the user with \`ImageIO\`, crops it into a grid according to the selected difficulty (3x3, 4x4, 5x5), and manages it by storing it in an \`ArrayList\`. This allows any image to be instantly converted into a puzzle game.

\`\`\`java
// Core logic to split image according to difficulty (row)
for (int x = 0; x < row; x++) {
    for (int y = 0; y < row; y++) {
        if (x + 1 == row && y + 1 == row) {
            emptyX = x; emptyY = y; // Last cell is empty
        } else {
            // Cut only the grid part from the original image and store in list
            picList.add(image.getSubimage(y * imageSize + imageBeginX, 
                                        x * imageSize + imageBeginY,
                                        imageSize, imageSize));
        }
    }
}
\`\`\`

2. **Puzzle Integrity Algorithm (Inversion Counting)**
Simple random shuffling risks creating an 'unsolvable puzzle'. To prevent this, I introduced the **Inversion Counting Algorithm**. It calculates the number of inversions during the shuffling process to verify if the puzzle is mathematically solvable and has complexity suitable for the set difficulty (Low/Medium/High) before starting the game.

\`\`\`java
// Determine if puzzle is solvable via Inversion count
int inversion = 0;
for(int i = 0; i < arr.length-1; i++) {
    int temp = arr[i];
    for(int j = i+1; j < arr.length; j++) {
        // Count numbers smaller than itself behind it
        if(temp > arr[j]) inversion++;
    }
}

// Verify appropriate complexity by difficulty
if(level == 1) { // Low
    if(row == 3 && inversion == 7) break; 
} else if(level == 2) { // Medium
    if(row == 3 && inversion == 13) break;
}
\`\`\`

3. **Event-Driven Interaction (MouseListener & Graphics)**
Calculates the user's click coordinates via \`MouseListener\` to move tiles, and overrides the \`paintComponent\` method to render the game's real-time state changes graphically.

4. **User Experience (UX)**
Enhanced the game's completeness by providing intuitive UI/UX such as audio processing for BGM and sound effects, congratulatory messages upon success, and difficulty adjustment popups.

5. **Timer and Thread Control (Thread & Runnable)**
Utilized **Thread and Runnable** to record game play time in real-time. Implemented a separate timer thread that increments every second to operate asynchronously with the main UI thread, and ensures resource management and accurate time measurement by interrupting existing threads and starting new ones upon game restart.

\`\`\`java
// Update timer every second in a separate thread
public void run() {
    while (true) {
        timerLabel.setText(Integer.toString(n));
        n++;
        try {
            Thread.sleep(1000); // Wait 1 second
        } catch (InterruptedException e) {
            return; // Exit on thread interrupt
        }
    }
}

// Clean up and recreate thread upon game restart
public void resetTimer() {
    if (th != null && th.isAlive()) {
        th.interrupt(); // Stop existing thread
    }
    th = new Thread(new TimerRunnable(timeLabel));
    th.start();
}
\`\`\`
`,
            image: "/media/java_puzzle.jpg",
            tags: ["Java", "Swing", "AWT", "Student Project"]
        },
        {
            id: "movie-website",
            title: "Movie Website using TMDB",
            date: "2024-11",
            summary: "Building my own movie website utilizing TMDB",
            description: `This project built a movie website that allows users to search for movie information and manage their own wishlists by utilizing the movie information API provided by TMDB (The Movie Database).

1. **Object-Oriented Architecture Design via Service Layer Separation**
Strictly separated UI components and business logic to maximize code reusability and maintainability. Specifically, applied the Service Layer pattern by modularizing URLService, AuthService, and WishList into independent classes.

[Core Code - URLService.ts]

\`\`\`typescript
export class URLService {
  private readonly API_KEY = process.env.VUE_APP_TMDB_API_KEY;
  private readonly BASE_URL = process.env.VUE_APP_TMDB_BASE_URL;

  // Modularize async communication logic to ensure reusability
  async fetchFeaturedMovie(): Promise<Movie> {
    const response = await axios.get(
      \u0024{this.BASE_URL}/movie/popular?api_key=\u0024{this.API_KEY}&language=ko-KR
    );
    return response.data.results[0] as Movie;
  }

  // Encapsulate dynamic endpoint generation
  getURL4GenreMovies(genre: string, page = 1): string {
    return \u0024{this.BASE_URL}/discover/movie?api_key=\u0024{this.API_KEY}&with_genres=\u0024{genre}&language=ko-KR&page=\u0024{page};
  }
}
export const urlService = new URLService();
\`\`\`

2. **User-Specific Independent Data Persistence (Auth & Wishlist)**
Implemented independent wishlist storage for each user in localStorage using Kakao login tokens as identifiers. Provides a personalized service experience by binding customized data to each user key (movieWishlist_\u0024{userId}) considering a multi-user environment.

[Core Code - AuthService.ts & WishList.ts]

\`\`\`typescript
// Auth state management class
export class AuthService {
  static isLoggedIn(): boolean {
    return !!localStorage.getItem("Kakao-Token");
  }
}

// User-specific wishlist management logic
private saveWishlist(): void {
  const userId = localStorage.getItem("Kakao-Token");
  if (!userId) return;

  // Store with user-specific key to maintain data integrity
  localStorage.setItem(\`movieWishlist_\u0024{userId}\`, JSON.stringify(this.wishlist.value));
}
\`\`\`

3. **TMDB API-based Real-time Data Rendering and Dynamic Filtering**
Collects real-time movie information using the TMDB API and dynamically renders data by various categories such as popular movies and latest releases. Optimizes asynchronous processing via Axios and performs interface-based data processing.

**[Key Implementation Methods]**
- **Home Screen Composition**: Implemented auto-load logic for main banner and popular/latest movie lists.
- **Dynamic Filtering**: Designed a flexible data request structure through endpoint branching according to genre and screening information.

**🛠 Tech Stack Summary**
- **Frontend**: Vue.js (Vue 3, Composition API), TypeScript
- **State & Data**: Axios, LocalStorage (Custom Persistence)
- **API**: TMDB (The Movie Database) API
- **Environment**: API Key security management using environment variables (.env)`,
            image: "/media/movie_project.png",
            tags: ["Vue.js", "TMDB API", "Frontend"],
            link: "https://jymovie.netlify.app/"
        },
        {
            id: "ai-lecture-agent",
            title: "AI Lecture Agent Building",
            date: "2025.12",
            summary: "AI Lecture Agent that automatically produces lecture videos just by uploading PPT.",
            description: `This project is to design and implement an AI Lecture Agent that automatically produces lecture videos when a PPT is uploaded. The goal is to automate the entire process from slide analysis, voice generation (TTS), video rendering, to final lecture video merging.

1. **LangGraph-based State-Centric AI Agent Workflow Design**
Designed the complex media creation process not as a one-way pipeline, but as a graph-based agent that shares state and decides the flow itself. Each node performs independent functions, and conditional edges allow selecting dynamic paths according to the situation.

\`\`\`python
# Constructing organic processes using LangGraph
builder = StateGraph(State)
builder.add_node('parse_all', node_parse_all)      # Extract PPT data
builder.add_node('gen_script_ctx', node_generate_script_with_context) # GPT-based script generation
builder.add_node('tts', node_tts)                 # OpenAI TTS conversion
builder.add_node('make_video', node_make_video)   # Individual slide video creation
builder.add_node('concat', node_concat)           # Final video merge

# Flow control via Conditional Edges
builder.add_conditional_edges(
    "decide_comment",
    decide_next_node, # Decide mode (spicy/sweet/normal) based on concentration
    {"spicy_comment": "spicy_comment", "sweet_comment": "sweet_comment", "tts_mp3": "tts"}
)
\`\`\`

2. **GPT-4o Based Multimodal Content Analysis and Script Enhancement**
Utilizes the GPT-4o-mini model to simultaneously analyze (Multimodal) and summarize texts, tables, and image binaries within slides. Especially, by combining web search context using SerpApi, it generates professional lecture commentary scripts beyond simple summaries.

\`\`\`python
# Constructing multimodal prompts processing images and text simultaneously
messages = [
    {"role": "system", "content": "You are a PPT summary expert."},
    {"role": "user", "content": [
        {"type": "text", "text": json.dumps(slide["texts"])}, # Slide text
        *[{"type": "image_url", "image_url": {"url": img_to_data_url(p)}} for p in slide["images"]] # Images in slide
    ]}
]
model = client.chat.completions.create(model="gpt-4o-mini", messages=messages)
\`\`\`

3. **Media Synthesis Algorithm and Automatic Subtitle (SRT) Generation**
Synthesizes static images (PPT snapshots) and voice into video using FFmpeg. Especially, I directly implemented a time allocation algorithm based on the character count ratio per sentence to generate SRT subtitles matching the voice and apply hard-coding technology to the video in real-time.

\`\`\`python
def build_srt_from_script(script, audio_path, out_srt):
    total_dur = ffprobe_duration(audio_path) # Measure audio length
    lengths = [len(re.sub(r"\s+", "", s)) for s in sentences] # Calculate weight per sentence
    
    # Apply weight-based time allocation algorithm
    for sent, dur in zip(sentences, adj_durs):
        lines.append(f"{sec_to_timestamp(start)} --> {sec_to_timestamp(end)}")
        lines.append(sent)

# Image + Audio + Subtitle synthesis using FFmpeg
vf = f"scale=1920:1080,subtitles='{subtitles_path}'"
subprocess.check_call(["ffmpeg", "-loop", "1", "-i", image_path, "-i", audio_path, "-vf", vf, ...])
\`\`\`

4. **'Spicy/Sweet' Event Engine for Student Concentration Management**
Implemented a function that infers the student's psychological state at specific points (e.g., 4th slide) to add stinging remarks (Spicy) or warm comfort (Sweet) comments to break the monotony of the lecture. This increases the value as an agent with an instructor persona beyond simple information delivery.

\`\`\`python
def node_spicy_comment(state: State) -> State:
    sys_prompt = "You are an AI instructor for office workers. Wake up the students with realistic and direct stinging remarks."
    # ... Generate stinging remarks matching current script context via GPT and combine
    combined_script = script.strip() + "\n\n" + spicy_comment
    state["slides"][idx]["script"] = combined_script
    return state
\`\`\`

5. **Gradio-based Real-time Interactive Service Interface Implementation**
Built a Gradio web dashboard so users can intuitively check the complex app.stream logic running on the backend. It streams the progress status of each node in real-time through a Progress Bar and provides preview and download functions for the final video, enhancing End-to-End service completeness.

\`\`\`python
# Agent execution and real-time status update via Gradio
def run_pipeline_ui(pptx_file, tone, voice, auto_clean, progress=gr.Progress()):
    # Deliver progress status per node to UI utilizing LangGraph's stream feature
    for event in app.stream(initial_state):
        for node_name, node_state in event.items():
            cur_slide = node_state.get("slide_index", 0)
            # Live update of Gradio Progress Bar
            progress(ratio, desc=f"[{node_name}] Processing Slide {cur_slide+1}...")

# Gradio UI Layout
with gr.Blocks(css=CUSTOM_CSS) as demo:
    inp_ppt = gr.File(label="Upload PPTX")
    run_btn = gr.Button("Run", variant="primary")
    out_video = gr.Video(label="Final Lecture Video")
    out_summary = gr.Markdown(label="Generation Result Summary")
\`\`\`

Through this project, by automating the repetitive and time-consuming lecture production process, we have laid the foundation for instructors or educational institutions to produce content faster and more efficiently.`,
            image: "/media/ai_agent_01.png",
            tags: ["AI", "Python", "LangGraph", "FFmpeg"],
            link: "https://drive.google.com/file/d/1nQBkg7uhSK4_EfHFJAAebcRIrK3bfGDY/view?usp=sharing"
        },
        {
            id: "android-restaurant-app",
            title: "Android Restaurant App using Kotlin",
            date: "2023.12",
            summary: "JBNU restaurant recommendation app providing personalized experiences via random recommendation, wishlist, and friend addition features.",
            description: `This is a restaurant recommendation app for Jeonbuk National University that provides a personalized experience to users through random recommendations, wishlists, and friend addition functions. It manages restaurant information using MySQL and PHP API, and implements an intuitive user interface including restaurant search and location display functions using Kakao API.
            
This project aims to provide user-friendly functions while emphasizing differentiation from existing restaurant apps. A major feature of the app is the random recommendation function. Through this, it randomly recommends Jeonbuk National University affiliate restaurants, broadening the user's range of choices. Also, by introducing a wishlist function, it allows users to save and manage their favorite restaurants, offering a personalized experience. The friend addition function builds a system where users can add friends and share restaurant information with each other.

An notification system is also designed to immediately deliver new news via real-time notices. The tech stack uses MySQL database and PHP API to store and manage restaurant information. It also includes functions to search for restaurant information and display locations on the map utilizing Kakao API. The user interface is designed to be intuitive and user-friendly, making login and sign-up procedures simple.

The restaurant list allows users to easily find desired restaurants through filter functions, and the detailed page provides detailed information on the clicked restaurant. The review writing function induces interaction between users and implements a system to save and display review contents. Through these functions, the Jeonbuk National University restaurant recommendation app aimed to provide a platform where users can conveniently search and share restaurant information.`,
            image: "/media/android_project.png",
            tags: ["Android", "Kotlin", "MySQL", "PHP"]
        },
        {
            id: "aws-deployment",
            title: "Automated Deployment Environment via AWS",
            date: "2025-12",
            summary: "Constructing High-Availability Frontend/Backend Deployment Architecture using EC2, ALB, Nginx",
            description: `Constructing Automatic Deployment Environment via AWS

1. **Overall Architecture Configuration**
   - **Frontend**: 1 EC2
   - **Backend**: 2 EC2s + ALB (AZ Distributed)
   - **Front-Back Connection**: Nginx Reverse Proxy + ALB DNS

![AWS Architecture](/media/aws_architecture.png)

2. **Frontend - Backend Connection Method**
   - Inject backend ALB DNS address as environment variable during frontend deployment
   - Forward /api requests to backend ALB through Nginx Reverse Proxy

3. **Automated CI/CD Pipeline Design**
Designed for automatic deployment without developer intervention upon code changes. Designed to clearly separate build and deployment logic. (buildspec.yml, appspec.yml)

![CI/CD Pipeline](/media/aws_cicd.png)

4. **Rolling Deployment-based Zero-Downtime Deployment**
**📌 Rolling Deployment Method**
- Do NOT stop all servers at once
- Update EC2 instances sequentially one by one
- Configure backend server with minimum 2 EC2 instances

**📌 Zero-Downtime Deployment**
- Temporarily exclude deploying instances from ALB target group
- Use remaining instances to continue processing user requests

![Rolling Deployment](/media/aws_rolling.png)

5. **Load Balancer Flow**
**📌 ALB Request Processing Process**
- User requests delivered to ALB
- ALB continuously checks status of EC2 registered in target group
- Distribute traffic only to instances in Healthy state

**EC2 Instance Minimum Count (2) Maintenance and State Management**
Use Auto Scaling Group for zero-downtime deployment and disaster recovery purposes rather than auto-scaling.

![Load Balancer Flow](/media/aws_alb.png)

6. **Manual Stage Setup**
Final pipeline configured with Manual Approval stage

![Manual Approval Pipeline](/media/aws_approval.png)

7. **Backend - Frontend Connection**
**📌 Frontend - Backend Connection using Nginx Proxy**
- Nginx on frontend server forwards API requests to backend ALB
- Configure stable communication environment by separating front and back through proxy structure

![Nginx Config](/media/nginx_config.png) ![Nginx Log](/media/nginx_log.png)`,
            image: "/media/aws_main.png",
            tags: ["AWS", "EC2", "Nginx", "CI/CD"]
        }
    ]
};

export const youtubeChannels = {
    ko: [
        {
            id: "nomad-coders",
            title: "노마드 코더",
            url: "https://www.youtube.com/channel/UCUpJs89fSBXNolQGOYKn0YQ",
            description: "노마드 코더는 프로그래밍과 웹 개발 관련 콘텐츠를 제공하는 인기 유튜브 채널입니다. 리액트, 노드, 뷰 등 깊이 있는 교육을 제공합니다.",
            image: "/media/featured.jpg"
        }
    ],
    en: [
        {
            id: "nomad-coders",
            title: "Nomad Coder",
            url: "https://www.youtube.com/channel/UCUpJs89fSBXNolQGOYKn0YQ",
            description: "Nomad Coders is a popular YouTube channel that provides content related to programming and web development. Offers in-depth education on React, Node.js, Vue.js, etc.",
            image: "/media/featured.jpg"
        }
    ]
};

export const sections = {
    ko: [
        {
            id: "it-news",
            title: "IT, 기술 뉴스",
            type: "collection",
            items: []
        }
    ],
    en: [
        {
            id: "it-news",
            title: "IT, Technical News",
            type: "collection",
            items: []
        }
    ]
};

export const staticContent = {
    ko: {
        header: {
            title: "JINYEONG",
            nav: {
                home: "Home",
                introduce: "Introduce",
                project: "Project"
            },
            toggle: "English"
        },
        introduce: {
            name: "고진영",
            role: "",
            dept: "전북대학교(JBNU) IT지능정보공학과",
            btn_resume: "이력서 다운로드",
            about_title: "Introduction",
            about_text: `안녕하세요. <span class="highlight">새로운 기술을 빠르게 습득</span>하고 직접 프로젝트를 연결하는 개발자 고진영입니다.
            
저는 프론트엔드부터 AI기반 자동화까지 폭넓은 프로젝트를 경험하며, 새로운 기술을 직접 실험하고, 실제 서비스로 구현하는 과정을 좋아합니다.

문제를 끝까지 해내는 집요함으로, 사용자에게 더 나은 경험을 제공하는 AI 엔지니어가 되는 그날까지 끊임없이 성장하겠습니다. :)`,
            tech_title: "Tech Stack",
            edu_title: "Education",
            edu_1_title: "KT 에이블스쿨 AI트랙",
            edu_1_desc: "실무 중심 AI 프로젝트 및 데이터 분석 심화 과정",
            edu_2_title: "전북대학교 IT지능정보공학과",
            edu_2_desc: "컴퓨터 공학 기초 및 지능형 시스템 전공"
        },
        contact: {
            title: "Contact Info",
            subtitle: "궁금한 점이 있으시면 언제든지 연락주세요.",
            name_label: "이름",
            email_label: "이메일",
            message_label: "메시지",
            send_btn: "메시지 보내기",
            sending: "보내는 중...",
            success: "메시지가 전송되었습니다!",
            error: "전송에 실패했습니다. 다시 시도해주세요."
        },
        projects: {
            title: "프로젝트",
            subtitle: "AI, 프론트엔드, 앱 개발 등 다양한 분야의 프로젝트 경험을 소개합니다.",
            sort_newest: "최신순",
            sort_oldest: "오래된순"
        }
    },
    en: {
        header: {
            title: "JINYEONG",
            nav: {
                home: "Home",
                introduce: "Introduce",
                project: "Project"
            },
            toggle: "한국어"
        },
        introduce: {
            name: "Ko Jin-young",
            role: "",
            dept: "JBNU Dept. of IT Intelligence & Information Engineering",
            btn_resume: "Download Resume",
            about_title: "Introduction",
            about_text: `Hello. I am <span class="highlight">Ko Jin-young</span>, a developer who learns new technologies quickly and connects them to projects.

I enjoy experiencing a wide range of projects from frontend to AI-based automation, experimenting with new technologies, and implementing them into actual services.

I will continue to grow until I become an AI engineer who provides a better experience to users with the persistence to solve problems to the end. :)`,
            tech_title: "Tech Stack",
            edu_title: "Education",
            edu_1_title: "KT AIVLE School AI Track",
            edu_1_desc: "Practical AI Projects & Advanced Data Analysis",
            edu_2_title: "Jeonbuk National University",
            edu_2_desc: "Computer Engineering Basics & Intelligent Systems Major"
        },
        contact: {
            title: "Contact Info",
            subtitle: "Feel free to contact me if you have any questions.",
            name_label: "Name",
            email_label: "Email",
            message_label: "Message",
            send_btn: "Send Message",
            sending: "Sending...",
            success: "Message Sent!",
            error: "Failed to send. Please try again."
        },
        projects: {
            title: "Projects",
            subtitle: "Explore the various projects I have worked on.",
            sort_newest: "Newest",
            sort_oldest: "Oldest"
        }
    }
};
