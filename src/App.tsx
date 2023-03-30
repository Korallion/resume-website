import React, { FunctionComponent, useEffect, useState } from 'react';
import './App.css';
import { About, Me, Project } from './types';


interface MeProps {
  me: Me;
}

const AboutMe: FunctionComponent<MeProps> = ({ me }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='header' onClick={() => { setOpen(!open) }}>
      <h1 className='header-title'>{me.name}</h1>
      <h1 className='text-sm'>(karl.jakelski@gmail.com)</h1>
      <h1 className='header-subtitle'>and his works</h1>
      {open &&
        <div className='w-auto mx-auto'>
          <p className='header-subtitle text-justify'>{me.about}</p>
        </div>
      }
    </div>
  );
}

interface ProjectProps {
  project: Project;
}

const AboutProject: FunctionComponent<ProjectProps> = ({ project }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='project'>
      <div className='project-header'>
        <h2 className='project-title'>{project.name + ' - ' + project.startDate}</h2>
        <h2 className={'project-status ' + (project.status === 'ongoing' ? 'ongoing' : 'complete')}>{project.status}</h2>
        <div className='skill-list'>
          {project.skills.map(skill => <a className="skill" href={skill.url} key={skill.name}>{skill.name}</a>)}
        </div>
      </div>
      <button className='reveal-button' onClick={() => { setOpen(!open) }}>{open ? 'less' : 'more'}</button>


      {open &&
        <div className='description-container'>
          <p className='project-description'>{project.description}</p>
          <div className='project-link-list'>
          {project.links.map(link => <a className='project-link' href={link.url} key={link.name}>{link.name}</a>)}
          </div>
        </div>
      }
    </div>
  )
}

function App() {
  const [data, setData] = useState<About>();

  useEffect(() => {
    fetch('./about.json')
      .then((response) => response.json())
      .then((data) => setData(data))
  }, []);

  if (!data) {
    return null;
  }

  let me = data.me;

  let projects = data.projects.map(project =>
    <AboutProject key={project.name} project={project} />
  );

  return (
    <>
      <AboutMe me={me} />
      {projects}
    </>
  );
}

export default App;
