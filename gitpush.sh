#!/bin/bash
echo "Pesan commit:"
read msg

git status
git add .
git commit -m "$msg"
git push origin main
