---
title: AI Lecture Agent Development
date: 2025-11-12
---
An AI system that automatically converts PPT slides into narrated lecture videos.


<!--more-->

I designed and implemented an AI Lecture Agent that automatically generates 
full lecture videos from a single uploaded PPT file. The system automates the entire 
workflow—from slide analysis and text-to-speech (TTS) generation to video rendering and final l
ecture compilation. It begins by extracting key information such as text, images, and tables 
from each slide, then uses this data to generate slide-specific lecture scripts. 
The OpenAI TTS model is then used to produce natural-sounding narration for each slide. Using ffmpeg, 
the system combines each slide image with its corresponding audio to create individual lecture videos. 
Once all slide videos are generated, they are merged sequentially into a complete lecture video.

The entire process is built on a LangGraph-based node architecture, enabling stable control over the 
flow of TTS generation → slide video creation → index progression → iteration → final video merging. 
This structure ensures scalability regardless of the number of slides or video length, while handling 
errors gracefully at the node level to maintain overall system stability.

Through this project, I automated a time-consuming aspect of lecture production, 
allowing instructors and educational institutions to generate content more efficiently. 
Implementing AI and media processing technologies into a practical service workflow was an especially 
meaningful experience for me.

My Role — Slide & Audio Video Assembly Module

Within the system, I was responsible for the core module that precisely combines slide images 
and corresponding audio into video assets. This task went beyond simply binding two files with 
ffmpeg—it required detailed control over slide indexing, file path management, and rendering video 
lengths to match narration timing.
During development, I faced several technical challenges. These included index misalignment and array 
boundary errors that caused IndexError, audio paths not being correctly stored in the state during 
TTS generation (resulting in missing audio in node_make_video), and issues where slide images were 
incorrectly exported or replaced with placeholder images. Additional challenges arose from ffmpeg, 
such as incorrect input paths, improper file generation order, and mismatched audio–video durations 
that caused abrupt cuts or rendering failures.

Because the system was built on a LangGraph architecture with multiple interconnected nodes, 
even a small mismatch in the state structure could break the entire pipeline. I spent considerable 
time validating audio lists, slide arrays, directory creation logic, and overall state consistency to 
improve stability. Although this debugging process was demanding, it allowed me to deeply understand 
the structure and behavior of the system.
Ultimately, I delivered a robust module that consistently merges slide images and audio into 
reliable video segments, contributing to a seamless pipeline that produces polished, fully assembled 
lecture videos.
