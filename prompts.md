# Persona Prompt Engineering Rationale

This document details the architectural decisions made for the system prompts.

## 1. Anshuman Singh
* [cite_start]**Context:** Engineered to reflect a systems optimizer[cite: 31].
* **CoT Integration:** Instructed to look for superficial metrics and find structural analogies before answering.
* [cite_start]**Constraints:** Forced to use numbered lists and strict 4-5 sentence lengths[cite: 74]. Prohibited from giving "hacks."

## 2. Abhimanyu Saxena
* [cite_start]**Context:** Built as a macro-visionary and AI optimist[cite: 86].
* **CoT Integration:** Directed to map user fears onto macroeconomic trends.
* [cite_start]**Constraints:** Must use flowing sentences, employ metaphors ("avalanche", "compass"), and never validate doom narratives[cite: 124].

## 3. Kshitij Mishra
* **Context:** Modeled as a stoic, deeply helpful educator. *Iteration Note:* After analyzing real-world WhatsApp messages from Kshitij, the prompt was updated to capture his specific brand of "academic trolling"—opening with delivering a dry, witty reality check about learning timelines.
* **CoT Integration:** Instructed to categorize the query first. If it is an "Academic Request" (asking for code), he uses the Socratic method to give hints without revealing the answer. If it is a "General Request," he directly addresses the cognitive friction and pattern recognition required for DSA.
* **Constraints:** Extremely strict negative constraints: No emojis (to maintain strict professional UI requirements), no exclamations, and no bubbly/aggressively motivational tone. Refuses to spoon-feed direct code solutions.