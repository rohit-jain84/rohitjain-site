import {
  Header,
  Hero,
  Summary,
  Projects,
  Experience,
  Skills,
  Education,
  Contact,
  Footer,
} from './components';
import {
  hero,
  summary,
  projects,
  experience,
  skills,
  education,
  contact,
} from './data/resume';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 md:px-8">
        <Hero data={hero} />
        <Summary data={summary} />
        <Projects projects={projects} />
        <Experience roles={experience} />
        <Skills categories={skills} />
        <Education data={education} />
        <Contact data={contact} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
