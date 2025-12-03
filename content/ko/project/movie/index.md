---
title: TMDB를 사용한 영화사이트 만들기
date: 2024-06-02
image:
focal_point: 'top'
---

TMDB를 활용하여 나만의 영화사이트 만들기

<!--more-->

본 프로젝트는 TMDB(The Movie Database)에서 제공하는 영화 정보 API를 활용하여 영화 정보를 조회하고, 
사용자별 관심 영화 목록을 관리할 수 있는 영화 웹사이트를 구축하는 것을 목표로 하였다. 프론트엔드는 Vue.js 기반으로 구현하였으며,
TMDB API를 통해 영화 포스터, 상세 정보, 인기작, 최신작 등 다양한 데이터를 실시간으로 제공하도록 설계하였다.

https://jymovie.netlify.app/

** 개발 환경 및 기술 스택 **
Frontend Framework: Vue.js 
API: TMDB(Movie Database) API
기능 구현 방식:
Axios를 이용한 API 데이터 호출
Vue Router를 활용한 화면 전환 및 라우팅 처리
Vuex 또는 로컬 스토리지를 활용한 사용자 관심 영화 저장

** 주요 기능 **
회원가입 및 로그인
사용자 회원가입 및 로그인 기능 구현
비밀번호 입력창에 TMDB API Key를 입력한 경우 홈 화면으로 이동하도록 처리(프로젝트 기획에 따른 기능 설정)

홈 화면 구성
메인 배너 영화 자동 로드
인기 영화(Trending Movies) 목록 표시
최신 영화(New Releases) 목록 표시

사용자 관심 영화 관리
사용자가 관심 있는 영화를 선택하여 관심 영화 목록에 저장 가능
저장된 영화들은 별도의 화면에서 모아보기 형태로 조회할 수 있도록 구성
