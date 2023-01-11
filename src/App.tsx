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
      <h1 className='header-subtitle'>and his works</h1>
      <h1>karl.jakelski@gmail.com</h1>
      {open &&
        <>
          <p className='header-subtitle'>{me.about}</p>
        </>
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
        <div onClick={() => { setOpen(!open) }}>
          <h2 className='project-title' >{project.name + ' - ' + project.startDate}</h2>
          <h2 className={'project-status ' + (project.status === 'ongoing' ? 'ongoing' : 'complete')}>{project.status}</h2>
        </div>
        <div className='skill-list'>
          {project.skills.map(skill => <a className="skill" href={skill.url} key={skill.name}>{skill.name}</a>)}
        </div>
      </div>

      {open &&
        <div>
          <p className='project-description'>{project.description}</p>
          {project.links.map(link => <a className='project-link' href={link.url} key={link.name}>{link.name}</a>)}
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
