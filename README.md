<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 600px)" srcset="assets/header-mobile-dark.svg">
  <source media="(prefers-color-scheme: light) and (max-width: 600px)" srcset="assets/header-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="assets/header-dark.svg">
  <img src="assets/header-light.svg" width="1280" alt="Richmond Ampah-Mensah — Applied AI, medical imaging, computer vision, and mobile and web software.">
</picture>

<p align="center">
  <a href="#selected-work">Selected work</a> &nbsp; / &nbsp;
  <a href="#research-interests">Research interests</a> &nbsp; / &nbsp;
  <a href="https://www.linkedin.com/in/kofi-richmond">LinkedIn</a> &nbsp; / &nbsp;
  <a href="mailto:ampahmensahrich@gmail.com">Email</a>
</p>

## Hello, I'm Richmond.

I work across **applied AI research, medical imaging, and software development**. My projects explore how models interpret images and documents, how their behavior changes during adaptation and compression, and how to turn those capabilities into usable applications.

My research interests include medical image segmentation, radiomics, vision transformers, and reliable evaluation. Alongside that work, I build mobile and web applications with attention to the details people interact with: clear screens, dependable workflows, and thoughtful UI/UX.

## Selected work

### Medical image segmentation

<a href="https://github.com/Richmiz/Deployment-Gatted"><img src="assets/project-med.svg" width="900" alt="Conceptual illustration of an image, a segmentation mask, and an evaluation step."></a>

**MedSAM-style adaptation, distillation, and compression.** Research code exploring LoRA adaptation of a segmentation teacher, a compact U-Net student, ONNX export, and INT8 evaluation against a predefined segmentation-quality threshold. The repository includes implementation code and lightweight experiment records.

<sub>MEDICAL IMAGING &nbsp; · &nbsp; PYTORCH &nbsp; · &nbsp; LORA &nbsp; · &nbsp; ONNX &nbsp; · &nbsp; QUANTIZATION</sub>

[Explore the research code →](https://github.com/Richmiz/Deployment-Gatted)


### Document evidence retrieval

<a href="https://github.com/Richmiz/docvqa-evidence-retrieval"><img src="assets/project-doc.svg" width="900" alt="Conceptual illustration of document pages, evidence retrieval, and a retrieved result."></a>

**Understanding where document question answering succeeds and fails.** A controlled comparison of OCR-text, visual, and hybrid evidence retrieval on DocVQA and MP-DocVQA. The reproducibility package includes locked configurations, aggregate results, tests, and analysis separating retrieval errors from answer-generation errors.

<sub>DOCUMENT AI &nbsp; · &nbsp; MULTIMODAL RETRIEVAL &nbsp; · &nbsp; VISION-LANGUAGE MODELS &nbsp; · &nbsp; EVALUATION</sub>

[Explore the study and results →](https://github.com/Richmiz/docvqa-evidence-retrieval)

### CatalogBridge

<a href="https://github.com/Richmiz/Jak2Shopee"><img src="assets/project-catalog.svg" width="900" alt="Conceptual illustration of a catalog operations interface with a sidebar and product records."></a>

**From supplier pages to reviewable product records.** A local operations application for JakMall catalog extraction, pricing rules, background jobs, and human review. Built with Next.js, TypeScript, and SQLite, with persistent job history and an interface for resolving uncertain data. The extraction and review workflow is implemented; marketplace publishing remains planned.

<sub>WEB APPLICATION &nbsp; · &nbsp; NEXT.JS &nbsp; · &nbsp; TYPESCRIPT &nbsp; · &nbsp; SQLITE &nbsp; · &nbsp; UI/UX</sub>

[Explore the application →](https://github.com/Richmiz/Jak2Shopee)

## Research that can be inspected

<a href="https://github.com/Richmiz/auditable-compression"><img src="assets/project-audit.svg" width="900" alt="Conceptual illustration of linked protocol, evidence, verification, and decision records."></a>

**[Auditable Compression](https://github.com/Richmiz/auditable-compression)** is a Python package for checking whether a model-compression experiment supports its recorded conclusion. It connects frozen protocols, integrity checks, and explicit decision rules, including a medical-imaging runtime case with a negative outcome.

This reflects an important part of my research practice: keeping the evaluation procedure, available evidence, and final claim consistent. A useful experiment can explain a failure as clearly as a success.

[Inspect the audit package →](https://github.com/Richmiz/auditable-compression) &nbsp; · &nbsp; [Reproduce the recorded decisions →](https://github.com/Richmiz/auditable-compression/blob/main/REPRODUCING.md)

## Research interests

- **Medical imaging:** segmentation, radiomics, representation learning, and evaluation across devices and datasets.
- **Efficient vision models:** LoRA, knowledge distillation, quantization, and the accuracy/runtime trade-offs involved in deployment.
- **Document understanding:** OCR, visual retrieval, multimodal evidence, and failure analysis in question answering.
- **Reliable machine learning:** calibration, distribution shift, controlled comparisons, and reproducible experimental workflows.

## Tools I work with

| Area | Technologies and methods |
| :--- | :--- |
| AI and scientific computing | Python · PyTorch · TensorFlow · NumPy · pandas · scikit-learn |
| Vision and model adaptation | Hugging Face Transformers · CLIP · LoRA · knowledge distillation |
| Model export and runtime | ONNX · ONNX Runtime · TensorFlow Lite · quantization |
| Mobile applications | React Native · Expo · TypeScript |
| Web applications | React · Next.js · Node.js · Tailwind CSS · SQLite |
| Design and development | Figma · Adobe Illustrator · Git · Linux / WSL |

<details>
<summary><b>A little more about how I work</b></summary>

<br>

For research, I care about the split between development and evaluation, meaningful baselines, and records that make a result possible to inspect. I keep limitations close to the conclusions they affect.

For applications, I care about what happens beyond the first successful interaction: loading, missing information, retries, review, and recovery. I enjoy working through both the implementation and the interface.

</details>

## Let's connect

Interested in medical imaging, applied AI, or building a useful application? I'd be glad to compare ideas and discuss a project.

**[Email](mailto:ampahmensahrich@gmail.com)** &nbsp; · &nbsp; **[LinkedIn](https://www.linkedin.com/in/kofi-richmond)** &nbsp; · &nbsp; **[X](https://x.com/richmiz__)** &nbsp; · &nbsp; **[All repositories](https://github.com/Richmiz?tab=repositories)**

<sub>Richmond Ampah-Mensah · Research, code, and design.</sub>
