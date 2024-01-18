<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">ExpressionMoodApp</h3>
<img width="659" alt="image" src="https://github.com/Jermaniac/ExpressionMoodApp/assets/47125376/161ec7c5-d63b-416a-a56b-0d305c4b3a00">
  <p align="center">
    This is a web application that recognizes seven facial expressions (angry, disgusted, scared, happy, sad, surprised, neutral) from a photograph using a Convolutional Neural Network (CNN). Essentially, it involves a client-server structure where the client sends a photograph to the server, which in this case is the CNN. The server makes predictions and sends the results back to the client as a response. The client get the results and show them to the user in a simple and intuitive way.
    <br />
    <a href="https://expression-test-9mcldoun8-jermaniac.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/Jermaniac/ExpressionMoodApp/issues">Report Bug</a>
    ·
    <a href="https://github.com/Jermaniac/ExpressionMoodApp/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<img width="979" alt="image" src="https://github.com/Jermaniac/ExpressionMoodApp/assets/47125376/946ecf90-56f3-4ffb-92cc-8e4fef09c155">
I am utilizing a custom API that I designed, accessible at [Github](https://github.com/Jermaniac/ExpressionAPI), which connects with a Convolutional Neural Network (CNN). I developed and trained this CNN as part of my final project during my studies in Software Engineering at UPM (Universidad Politécnica de Madrid).
You can check my TFG repository [here](https://github.com/gggarzon/TrabajoFinGradoGerman).
After developing this CNN I decided to create a web client using what I have learned during my profesional experience working as a web developer.
This CNN achieves a reliable 65% prediction accuracy.
<img width="577" alt="image" src="https://github.com/Jermaniac/ExpressionMoodApp/assets/47125376/f28cf5af-0650-4ffc-ad71-ed050af6bb57">

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][react.js]][react-url]
- [![Tailwind][tailwind.com]][tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Jermaniac/ExpressionMoodApp.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the project
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage
Uplaod a photo and get mood percentages!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Linkedin: [Germán González Garzón](https://es.linkedin.com/in/germ%C3%A1n-gonz%C3%A1lez-garz%C3%B3n-8807a2162)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- The first upload request may experience a delay due to
  server initialization. If this occurs, please try again after a
  minute.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

This documentation template was made using: [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

[contributors-shield]: https://img.shields.io/github/contributors/Jermaniac/ExpressionMoodApp.svg?style=for-the-badge
[contributors-url]: https://github.com/Jermaniac/ExpressionMoodApp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Jermaniac/ExpressionMoodApp.svg?style=for-the-badge
[forks-url]: https://github.com/Jermaniac/ExpressionMoodApp/network/members
[stars-shield]: https://img.shields.io/github/stars/Jermaniac/ExpressionMoodApp.svg?style=for-the-badge
[stars-url]: https://github.com/Jermaniac/ExpressionMoodApp/stargazers
[issues-shield]: https://img.shields.io/github/issues/Jermaniac/ExpressionMoodApp.svg?style=for-the-badge
[issues-url]: https://github.com/Jermaniac/ExpressionMoodApp/issues
[license-shield]: https://img.shields.io/github/license/Jermaniac/ExpressionMoodApp.svg?style=for-the-badge
[license-url]: https://github.com/Jermaniac/ExpressionMoodApp/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/germán-gonzález-garzón-8807a2162
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[tailwind.com]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
