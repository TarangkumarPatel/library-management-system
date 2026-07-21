import Link from "next/link";
import { Card } from "react-bootstrap";
import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";

export async function getStaticProps()
{
    const workId = "OL20684374W";

    const res = await fetch(`https://openlibrary.org/works/${workId}.json`);
    const data = await res.json();

    // --- HARDCODING MISSING DATA FOR TRANSCENDENCE ---
    // Since the API result is empty for these fields, we manually add them here.
    
    if (!data.description) {
        data.description = "Transcendence: My Spiritual Experiences with Pramukh Swamiji is a book written by A. P. J. Abdul Kalam, the 11th President of India. The book describes Kalam's spiritual experiences with Pramukh Swami Maharaj, the guru and spiritual leader of the BAPS Swaminarayan Sanstha. It explores how science and spirituality can work together for the betterment of humanity.";
    }

    if (!data.subject_people) {
        data.subject_people = [
            "A. P. J. Abdul Kalam",
            "Pramukh Swami Maharaj",
            "Arun Tiwari"
        ];
    }

    if (!data.subject_places) {
        data.subject_places = [
            "India",
            "Ahmedabad",
            "New Delhi",
            "Akshardham"
        ];
    }

    if (!data.links) {
        data.links = [
            {
                url: "https://en.wikipedia.org/wiki/Transcendence:_My_Spiritual_Experiences_with_Pramukh_Swamiji",
                title: "Wikipedia"
            },
            {
                url: "https://www.goodreads.com/book/show/25931454-transcendence-my-spiritual-experiences-with-pramukh-swamiji",
                title: "Goodreads"
            },
            {
                url: "https://www.baps.org/Publications/Books/Transcendence-1287.aspx",
                title: "BAPS website"
            },
            {
                url: "https://www.amazon.ca/Transcendence-Spiritual-Experiences-Pramukh-Swamiji/dp/9351774058/ref=sr_1_1?crid=3TJ4QTMDNSFPL&dib=eyJ2IjoiMSJ9.2U9sjihJlbP1O_j1D66MW8qVH5iqbKJbKfM2W9wROlzwlqJ-JD-pWhQ9ykqTopOjzymOyFotuf-MQuZg3ZorNQwGjNgAXdEYV5RfG6bRbCSq6GtbV_v-TwNnQloM8bCNVxL1SEsdKXO9vkabhLGWuBTnnxiAp3OTLzPB4JEGKZo_HrpAIOKVfLrysX1vqUZN1rlgzuLgL1FxmOe7J0dVqYYainhJ3advHb_AM-a3A9KWAMttVB6B9Zb94ceH3_WDCUQS3dlMwcT4n3FuHkhDVQ9OEJiBldx3VQ8it_cM7vU.-RfhZZS7MbxJPaPeZYzCJ4Tj9WSe5fTabv25qRGsRcY&dib_tag=se&keywords=transcendence&qid=1770962130&sprefix=transcendence%2Caps%2C107&sr=8-1",
                title: "Amazon"
            }
        ];
    }

    return {props: {book: data, workId: workId}};
}
export default function About(props) {
    return (
        <>
            <PageHeader text="About the Developer" subtext="Tarangkumar Janakkumar Patel" />
            <Card className="p-4 p-md-5 mb-4 fade-in-up delay-1">
                <Card.Body>
                    <p>
                        I am a Computer Programmer based in Toronto with a Diploma in Computer Programming from Seneca Polytechnic.
                        Currently, I am pursuing my Honors Bachelors of Software Development from Seneca.
                    </p>
                    <p>
                        Driven by a strong interest in Full Stack Development, my journey is defined by a love for solving complex problems and a continuous drive to master modern web technologies.
                        Currently, I am focused on building responsive, user-centric applications using tools like Next.js and React-Bootstrap.
                    </p>
                    <p className="mb-0">
                        The book featured here is <strong>{props.book.title}</strong> by <strong> Dr. A.P.J Abdul Kalam</strong> mentioning his expeiences with s spiritual leader <strong>H.D.H Pramukh Swami Maharaj. </strong>.
                        I chose this book because it beautifully bridges the worlds of <strong>Science and Spirituality</strong>.
                        It documents the unique friendship between a top scientist and Pramukh Swami Maharaj,
                        illustrating how technology and leadership can be guided by universal human values.
                    </p>
                </Card.Body>
            </Card>
            <BookDetails book = {props.book} workId={props.workId} showFavouriteBtn={false} />
        </>
    );
}