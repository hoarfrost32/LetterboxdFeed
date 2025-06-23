/**
 * LetterboxdFeed - A Web Component to display the latest films from a Letterboxd diary.
 *
 * This component fetches a user's public Letterboxd RSS feed, parses it,
 * and displays a list of the most recently watched films.
 *
 * @element letterboxd-feed
 *
 * @attribute {string} username - The Letterboxd username to fetch the feed from. (Required)
 * @attribute {number} [count=5] - The number of films to display. (Optional)
 *
 * @cssproperty --film-text-color - The color of the film title text.
 * @cssproperty --film-muted-text-color - The color of the dotted line.
 * @cssproperty --film-star-active-color - The color of the filled-in part of the stars.
 * @cssproperty --film-star-inactive-color - The color of the empty part of the stars.
 * @cssproperty --film-star-size - The font size of the stars.
 * @cssproperty --film-max-width - The maximum width of the component.
 */
class LetterboxdFeed extends HTMLElement {
    constructor() {
        super();
        // Create a Shadow DOM for encapsulation
        this.attachShadow({ mode: 'open' });
    }

    /**
     * Called when the element is added to the document.
     * This is where the main logic happens.
     */
    connectedCallback() {
        const username = this.getAttribute('username');
        const count = this.getAttribute('count') || 5;

        this._renderStyles();

        const container = document.createElement('div');
        this.shadowRoot.appendChild(container);

        if (!username) {
            container.innerHTML = `<p>Error: The 'username' attribute is required.</p>`;
            return;
        }

        this._fetchAndRenderFilms(username, count, container);
    }

    /**
     * Injects the component's CSS into the Shadow DOM.
     * Styles are scoped and won't leak out to the main document.
     */
    _renderStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
              display: block;
              --film-text-color: #b4befe;
              --film-muted-text-color: #a6adc8;
              --film-star-active-color: color-mix(in hsl, #1e1e2e, white 35%);
              --film-star-inactive-color: color-mix(in hsl, #1e1e2e, white 10%);
              --film-star-size: 1em;
              --film-max-width: 40rem;
            }

            .film-ordered-list {
              list-style-type: decimal;
              padding-left: 2em;
              margin: 1.5em auto;
              max-width: var(--film-max-width);
            }

            .film-ordered-list li {
              margin-bottom: 0.75em;
              padding-left: 0.5em;
            }

            .film-link-item {
              display: flex;
              align-items: baseline;
              text-decoration: none;
              color: var(--film-text-color);
              transition: opacity 0.125s ease-in-out;
              opacity: 0.8;
            }

            .film-link-item:hover,
            .film-link-item:focus {
              opacity: 1;
            }

            .film-link-item:hover .film-title-text,
            .film-link-item:focus .film-title-text {
              text-decoration: underline;
            }

            .film-title-text {
              flex-shrink: 1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .film-dots {
              flex-grow: 1;
              border-bottom: 1px dotted var(--film-muted-text-color);
              margin: 0 0.5em;
              position: relative;
              bottom: 4px;
            }

            .star-rating {
              --star-background: var(--film-star-active-color);
              --star-color: var(--film-star-inactive-color);
              --star-size: var(--film-star-size);
              --percent: calc((var(--rating) / 5) * 100%);

              display: inline-block;
              font-size: var(--star-size);
              font-family: Times, 'Times New Roman', serif;
              line-height: 1;
            }

            .star-rating::before {
              content: '★★★★★';
              letter-spacing: 3px;
              background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    /**
     * Fetches the RSS feed and renders the film list.
     * @param {string} username - The Letterboxd username.
     * @param {number} count - The number of films to show.
     * @param {HTMLElement} container - The element to render the content into.
     */
    _fetchAndRenderFilms(username, count, container) {
        const rssUrl = `https://letterboxd.com/${username}/rss/`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        container.innerHTML = "<p>Loading films...</p>";

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status !== 'ok' || !data.items || data.items.length === 0) {
                    throw new Error(data.message || "No films found in the feed.");
                }

                const films = data.items.slice(0, count);
                const filmList = document.createElement("ol");
                filmList.className = "film-ordered-list";

                films.forEach(film => {
                    let preFormattedTitle = film.title;
                    let ratingString = "";
                    let ratingValue = 0;

                    const ratingSeparator = ' - ';
                    const separatorIndex = preFormattedTitle.lastIndexOf(ratingSeparator);

                    if (separatorIndex !== -1) {
                        const potentialRating = preFormattedTitle.substring(separatorIndex + ratingSeparator.length);
                        if (potentialRating.startsWith('★') || potentialRating.startsWith('½')) {
                            ratingString = potentialRating.trim();
                            preFormattedTitle = preFormattedTitle.substring(0, separatorIndex).trim();
                        }
                    }

                    if (ratingString) {
                        const hasHalfStar = ratingString.includes('½');
                        ratingValue = ratingString.length;
                        if (hasHalfStar) {
                            ratingValue -= 0.5;
                        }
                    }

                    let displayTitle = preFormattedTitle;
                    const titleParts = preFormattedTitle.split(',');
                    const lastPart = titleParts.length > 1 ? titleParts[titleParts.length - 1].trim() : "";

                    if (lastPart.length === 4 && !isNaN(parseInt(lastPart, 10)) && parseInt(lastPart, 10) > 1880) {
                        const year = lastPart;
                        const baseTitle = titleParts.slice(0, -1).join(',').trim();
                        displayTitle = `${baseTitle} (${year})`;
                    }

                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    link.href = film.link;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    link.className = "film-link-item";

                    const titleSpan = document.createElement("span");
                    titleSpan.className = "film-title-text";
                    titleSpan.textContent = displayTitle;

                    const dotsSpan = document.createElement("span");
                    dotsSpan.className = "film-dots";

                    const ratingDiv = document.createElement("div");
                    ratingDiv.className = "star-rating";
                    ratingDiv.style.setProperty('--rating', ratingValue);
                    ratingDiv.setAttribute("aria-label", `Rating: ${ratingValue} out of 5 stars`);

                    link.appendChild(titleSpan);
                    link.appendChild(dotsSpan);
                    link.appendChild(ratingDiv);
                    listItem.appendChild(link);
                    filmList.appendChild(listItem);
                });

                container.innerHTML = "";
                container.appendChild(filmList);

            })
            .catch(error => {
                console.error("Letterboxd Fetch Error:", error);
                container.innerHTML = `<p>Could not load films for user: ${username}.</p>`;
            });
    }
}

customElements.define('letterboxd-feed', LetterboxdFeed);
