# Letterboxd Feed Web Component

Fetch and display the latest films from your Letterboxd diary. It fetches the RSS feed, parses it, and renders a clean, styleable list of recently watched films.

![image](https://github.com/user-attachments/assets/7704471e-8709-46c6-a901-819f572e4210)

## Usage

To use this component, include the `LetterboxdFeed.js` script in your HTML file.

```html
<script src="path/to/LetterboxdFeed.js"></script>
```

Once the script is included, you can add the `<letterboxd-feed>` custom element to your page. The `username` attribute is required.

```html
<letterboxd-feed username="your-letterboxd-username"></letterboxd-feed>
```

### Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Latest Watched Films</title>
    <script src="LetterboxdFeed.js"></script>
</head>
<body>

    <h1>Latest Films I've Watched</h1>
    <letterboxd-feed username="dave" count="10"></letterboxd-feed>

</body>
</html>
```

## Configuration

Configure the component by setting the following HTML attributes on the `<letterboxd-feed>` element:

| Attribute  | Description                                     | Type     | Default | Required |
| ---------- | ----------------------------------------------- | -------- | ------- | -------- |
| `username` | The Letterboxd username to fetch the diary from.  | `string` | `null`  | **Yes**  |
| `count`    | The number of recent films to display.          | `number` | `5`     | No       |

## Styling

The component's styles are encapsulated within its Shadow DOM. You can override the default styling by defining any of the following CSS Custom Properties on the `letterboxd-feed` element itself or in a global stylesheet.

### Example

```css
letterboxd-feed {
  --film-text-color: #cdd6f4;
  --film-muted-text-color: #7f849c;
  --film-star-active-color: #f5c2e7;
  --film-star-inactive-color: #45475a;
  --film-star-size: 1.1em;
  --film-max-width: 50rem;
}
```

### Available Properties

| CSS Custom Property          | Description                                    | Default Value                                  |
| ---------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `--film-text-color`          | The color of the film title text.              | `#b4befe`                                      |
| `--film-muted-text-color`    | The color of the dotted line.                  | `#a6adc8`                                      |
| `--film-star-active-color`   | The color of the filled portion of the stars.  | `color-mix(in hsl, #1e1e2e, white 35%)`        |
| `--film-star-inactive-color` | The color of the empty portion of the stars.   | `color-mix(in hsl, #1e1e2e, white 10%)`        |
| `--film-star-size`           | The font size of the rating stars.             | `1em`                                          |
| `--film-max-width`           | The maximum width of the component container.  | `40rem`                                        |
