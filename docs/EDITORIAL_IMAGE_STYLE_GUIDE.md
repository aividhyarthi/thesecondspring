# The Second Spring: Editorial Image Style Guide

Status: Approved visual direction for editorial production
Reference: The user-provided colored-pencil illustration of a South Asian midlife woman in a cream saree with rust details, botanical elements and everyday wellness objects.
Applies to: Blog and editorial feature images across The Second Spring.

## 1. Visual identity

The Second Spring should use a recognisable, human editorial illustration style rather than generic stock photography or generic medical diagrams.

Core characteristics:
- Hand-drawn colored-pencil and light watercolor texture.
- Warm, natural, slightly imperfect pencil lines and visible paper-like texture.
- South Asian women, especially women in their late 30s, 40s, 50s and older, represented with dignity and variety.
- Natural expressions and believable everyday situations. Women should look thoughtful, active, relaxed, concerned or engaged according to the article, never uniformly cheerful.
- Indian visual details where relevant: sarees, kurtas, home interiors, plants, familiar food, local streets, work settings and family contexts. Do not force cultural props into every image.
- Warm earthy palette: cream, off-white, rust, terracotta, muted rose, sage green, warm brown and soft ochre.
- Clean white or warm-white background with generous negative space.
- Editorial composition with one clear focal subject and a small number of relevant supporting objects.
- No text, logos, labels, captions, watermarks, charts or fake medical interface elements inside the image.

## 2. Image production specifications

- Preferred aspect ratio: 16:9.
- Preferred working size: 1600 x 900 pixels or larger.
- Format: WebP for delivery where the publishing pipeline supports it; otherwise high-quality JPEG.
- Keep the main subject and important objects inside the central safe area so crops work on mobile and desktop.
- Use descriptive, lowercase, hyphenated filenames.
- Store final blog images under `public/images/blog/`.
- Add both `image` and descriptive `imageAlt` fields to article frontmatter.
- Do not use one illustration for multiple unrelated articles. Related article clusters may share a visual language, not the same asset.

## 3. Editorial image prompt structure

Every image prompt should contain:
1. The article's actual subject and reader question.
2. A specific South Asian woman or group appropriate to the story, without implying that all women have the same experience.
3. A believable scene or gesture connected to the subject.
4. Two to four relevant objects that explain the topic without turning the image into a medical infographic.
5. The signature colored-pencil and watercolor treatment.
6. White background, warm earthy palette, editorial negative space and 16:9 composition.
7. Explicit exclusions: no text, no labels, no logos, no watermark, no stock-photo look, no exaggerated medical anatomy.

## 4. Avoid

- Generic stock-photo aesthetics.
- Plastic-looking AI skin, glossy 3D renders or cartoon characters.
- Repeating the same face, pose, saree, props or layout across consecutive articles.
- Depicting menopause as illness, decline or loss of femininity.
- Using body-shaming visual cues such as a distressed woman beside a scale.
- Suggesting that a symptom is definitely caused by menopause.
- Anatomical imagery that is inaccurate, graphic or unnecessary.
- Medical claims embedded in the image.
- Text rendered inside generated images. Headlines belong in the page design, not in the image.

## 5. Representation and medical safety

- Show women of different skin tones, body shapes, ages, abilities and settings over the full library.
- Do not infer a medical diagnosis from appearance.
- Do not depict a treatment, medicine or supplement as a recommendation unless the article and clinical review support that context.
- For sensitive topics such as bleeding, cancer, sexual health, mental health and hormone therapy, use calm, respectful and non-sensational imagery.
- Prefer symbolic or everyday scenes over literal anatomy when a literal image could mislead or distress readers.

## 6. Frontmatter example

```yaml
image: "/images/blog/perimenopause-sleep-and-night-sweats.webp"
imageAlt: "A South Asian woman in midlife sitting by her bedside after a restless night, illustrated in warm colored pencil and watercolor"
```

## 7. Rollout plan

The repository currently contains approximately 450 blog markdown files. Images should be added in controlled batches rather than generated indiscriminately.

Recommended order:
1. New and recently updated research-led articles.
2. Core perimenopause explainers and symptom clusters.
3. Treatment, HRT and clinical decision guides.
4. Indian nutrition, movement and lifestyle articles.
5. Relationships, work, mental wellbeing and community stories.
6. Remaining evergreen articles.

For each batch:
- Audit existing image frontmatter and the live page before creating an asset.
- Prioritise articles with no image, weak generic imagery or an image that does not match the article.
- Create an individual image brief and asset for each article.
- Add image path and alt text to frontmatter.
- Check the rendered page at desktop and mobile widths.
- Confirm no duplicate image, broken path or inappropriate medical implication.
- Keep image assets and article changes in reviewable GitHub commits.

## 8. Quality gate

An image is ready only when it is:
- Relevant to the exact article.
- Visually consistent with The Second Spring.
- Respectful and representative.
- Free of embedded text and misleading medical claims.
- Legible when cropped to a 16:9 card and a smaller mobile thumbnail.
- Saved in the correct path and referenced by valid frontmatter.

This guide defines the visual system. It does not mean that every one of the existing 450 articles has already been illustrated or reviewed.
