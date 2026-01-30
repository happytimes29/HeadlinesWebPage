-- JK Space Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Articles table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) NOT NULL,
  locale VARCHAR(10) NOT NULL DEFAULT 'en',
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100),
  summary TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(slug, locale)
);

-- Indexes for better query performance
CREATE INDEX idx_articles_locale ON articles(locale);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published ON articles(published_at DESC);
CREATE INDEX idx_articles_category ON articles(category);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Allow public read access" ON articles
  FOR SELECT
  USING (true);

-- Sample article (English)
INSERT INTO articles (slug, locale, title, content, category, summary) VALUES (
  'welcome-to-jk-space',
  'en',
  'Welcome to JK Space',
  '## Introduction

Welcome to JK Space, a tech blog focused on AI applications, electronics engineering, and technology trends.

As a hardware engineer with experience in wireless routers, smartphones, and e-bikes, I bring a unique perspective to the intersection of hardware and software in the AI era.

## What to Expect

On this blog, you will find:

- **Technical deep-dives** into AI and machine learning applications
- **Hardware insights** from real-world engineering experience
- **Industry analysis** on emerging tech trends
- **Practical tutorials** for developers and engineers

## Stay Connected

Subscribe to stay updated with the latest articles and insights from the world of technology.

```python
# Example: Simple AI model inference
import torch

model = torch.load("model.pt")
result = model.predict(input_data)
print(f"Prediction: {result}")
```

Thank you for visiting JK Space!',
  'General',
  '- JK Space is a tech blog by a hardware engineer
- Focus on AI applications, electronics, and tech trends
- Offers technical deep-dives, hardware insights, and tutorials
- Combines hardware engineering experience with AI/ML content'
);

-- Sample article (Traditional Chinese)
INSERT INTO articles (slug, locale, title, content, category, summary) VALUES (
  'welcome-to-jk-space',
  'zh-TW',
  '歡迎來到 JK Space',
  '## 簡介

歡迎來到 JK Space，這是一個專注於 AI 應用、電子工程和科技趨勢的技術部落格。

作為一位具有無線路由器、智慧手機和電動自行車開發經驗的硬體工程師，我為 AI 時代的軟硬體整合帶來獨特的觀點。

## 內容預告

在這個部落格，你將看到：

- **技術深度剖析** AI 和機器學習應用
- **硬體洞察** 來自真實工程經驗
- **產業分析** 新興科技趨勢
- **實作教學** 給開發者和工程師

## 保持聯繫

訂閱以獲取科技世界的最新文章和見解。

```python
# 範例：簡單的 AI 模型推論
import torch

model = torch.load("model.pt")
result = model.predict(input_data)
print(f"預測結果: {result}")
```

感謝造訪 JK Space！',
  '一般',
  '- JK Space 是一個由硬體工程師經營的科技部落格
- 專注於 AI 應用、電子工程和科技趨勢
- 提供技術深度剖析、硬體洞察和實作教學
- 結合硬體工程經驗與 AI/ML 內容'
);

-- Sample article (Simplified Chinese)
INSERT INTO articles (slug, locale, title, content, category, summary) VALUES (
  'welcome-to-jk-space',
  'zh-CN',
  '欢迎来到 JK Space',
  '## 简介

欢迎来到 JK Space，这是一个专注于 AI 应用、电子工程和科技趋势的技术博客。

作为一位具有无线路由器、智能手机和电动自行车开发经验的硬件工程师，我为 AI 时代的软硬件整合带来独特的观点。

## 内容预告

在这个博客，你将看到：

- **技术深度剖析** AI 和机器学习应用
- **硬件洞察** 来自真实工程经验
- **产业分析** 新兴科技趋势
- **实操教程** 给开发者和工程师

## 保持联系

订阅以获取科技世界的最新文章和见解。

```python
# 示例：简单的 AI 模型推理
import torch

model = torch.load("model.pt")
result = model.predict(input_data)
print(f"预测结果: {result}")
```

感谢访问 JK Space！',
  '一般',
  '- JK Space 是一个由硬件工程师经营的科技博客
- 专注于 AI 应用、电子工程和科技趋势
- 提供技术深度剖析、硬件洞察和实操教程
- 结合硬件工程经验与 AI/ML 内容'
);
