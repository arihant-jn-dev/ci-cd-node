#!/bin/bash
# CI/CD Pipeline Demo Script
# This script helps you switch between passing and failing test scenarios

echo "🔄 CI/CD Pipeline Demo Controller"
echo "================================="
echo ""
echo "Choose a demo scenario:"
echo ""
echo "1. 🟢 PASSING Pipeline (Default)"
echo "   - All tests pass"
echo "   - Pipeline completes successfully"
echo "   - Deployment proceeds"
echo ""
echo "2. 🔴 FAILING Pipeline"
echo "   - Tests intentionally fail"
echo "   - Pipeline stops at test stage"
echo "   - Deployment is prevented"
echo ""
echo "3. 📊 View Current Status"
echo ""
echo "4. 🧪 Test Locally (Passing)"
echo ""
echo "5. 💥 Test Locally (Failing)"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
  1)
    echo ""
    echo "🟢 Setting up PASSING pipeline..."
    # Use the original CI/CD workflow
    if [ -f ".github/workflows/ci-cd-fail.yml" ] && [ -f ".github/workflows/ci-cd.yml" ]; then
      echo "✅ Passing pipeline is already active"
    else
      echo "✅ Passing pipeline configured"
    fi
    echo ""
    echo "📋 To trigger the passing pipeline:"
    echo "   git add ."
    echo "   git commit -m 'Test passing pipeline'"
    echo "   git push origin main"
    echo ""
    echo "Expected result: ✅ Build → ✅ Test → ✅ Deploy"
    ;;
    
  2)
    echo ""
    echo "🔴 Setting up FAILING pipeline..."
    # Backup original workflow and use failing one
    cp .github/workflows/ci-cd.yml .github/workflows/ci-cd-backup.yml
    cp .github/workflows/ci-cd-fail.yml .github/workflows/ci-cd.yml
    echo "✅ Failing pipeline configured"
    echo ""
    echo "📋 To trigger the failing pipeline:"
    echo "   git add ."
    echo "   git commit -m 'Test failing pipeline'"
    echo "   git push origin main"
    echo ""
    echo "Expected result: ✅ Build → ❌ Test → 🚫 Deploy (skipped)"
    echo ""
    echo "⚠️  To restore passing pipeline later:"
    echo "   cp .github/workflows/ci-cd-backup.yml .github/workflows/ci-cd.yml"
    ;;
    
  3)
    echo ""
    echo "📊 Current Pipeline Status:"
    echo "=========================="
    if [ -f ".github/workflows/ci-cd-backup.yml" ]; then
      echo "🔴 FAILING pipeline is currently active"
      echo "   Tests will intentionally fail"
      echo "   Deployment will be prevented"
    else
      echo "🟢 PASSING pipeline is currently active"
      echo "   Tests will pass normally"
      echo "   Deployment will proceed"
    fi
    echo ""
    echo "📁 Available test files:"
    ls -la test/
    ;;
    
  4)
    echo ""
    echo "🧪 Running PASSING tests locally..."
    npm test
    ;;
    
  5)
    echo ""
    echo "💥 Running FAILING tests locally..."
    echo "⚠️  These tests are designed to fail!"
    npm run test:fail
    ;;
    
  *)
    echo ""
    echo "❌ Invalid choice. Please run the script again."
    ;;
esac

echo ""
echo "🔗 Useful commands:"
echo "  npm test           - Run passing tests"
echo "  npm run test:fail  - Run failing tests"
echo "  git status         - Check git status"
echo "  git log --oneline  - View commit history"
echo ""
