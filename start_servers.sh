#!/bin/bash

# 경로 설정
PROJECT_DIR=~/Documents/GitHub/AIDraw
BACKEND_DIR=$PROJECT_DIR/backend
FRONTEND_DIR=$PROJECT_DIR/frontend

# 백엔드 서버 시작
cd $BACKEND_DIR
npm run dev &

# 프론트엔드 서버 시작
cd $FRONTEND_DIR
export PORT=3001
npm start &
