// Объединённый контент из обоих файлов (123.txt и 222.txt)
// Структурирован по разделам для единого урока с прокруткой

import { lessonImages } from './lessonImages.generated'

const attachImagesToLesson = (lesson, images) => {
  let cursor = 0

  const sections = (lesson.sections || []).map((section, idx) => {
    if (!images || cursor >= images.length) return section

    const textLen = (section.content || '').length
    let count = 0

    // Чем больше текста — тем больше картинок, плюс лёгкая равномерность по разделам.
    if (textLen > 2200) count = 3
    else if (textLen > 1200) count = 2
    else if (textLen > 650) count = 1
    else if (idx % 3 === 0) count = 1

    count = Math.min(3, Math.max(0, count))
    const picked = images.slice(cursor, cursor + count)
    cursor += count

    if (picked.length === 0) return section

    return {
      ...section,
      images: picked.map((img) => ({
        ...img,
        caption: img.caption ? `Иллюстрация: ${img.caption}` : undefined
      }))
    }
  })

  return { ...lesson, sections }
}

const baseLessonsData = [
  {
    id: 'combined',
    title: 'Автоматизация конструкторского и технологического проектирования. CALS-технологии в машиностроении',
    title_en: 'Automation of design and technological design. CALS technologies in mechanical engineering',
    sections: [
      {
        id: 'intro-1',
        title: 'ВВЕДЕНИЕ',
        title_en: 'INTRODUCTION',
        content: `УЧЕБНО-МЕТОДИЧЕСКИЙ КОМПЛЕКС
по дисциплине «Автоматизация конструкторского и технологического проектирования»

Настоящий учебно-методический комплекс предназначен для студентов технических направлений подготовки, изучающих дисциплину «Автоматизация конструкторского и технологического проектирования». Дисциплина направлена на формирование у обучающихся системного представления о современных методах и средствах автоматизации процессов проектирования и технологической подготовки производства в машиностроении.

Проектирование является одним из ключевых этапов жизненного цикла изделия и включает поиск, обоснование и документирование функциональных и конструктивных решений. Эти решения формируются в виде функциональной структуры изделия и впоследствии материализуются с использованием технологических предписаний, обеспечивающих выполнение всех заданных функциональных требований.

В процессе проектирования разрабатываются не только чертежи изделия, но и технологические процессы его изготовления. Таким образом, этап проектирования отвечает на вопрос «что представляет собой изделие», а этап технологической подготовки производства — «каким образом это изделие может быть изготовлено».

Проектирование технического объекта представляет собой создание, преобразование и представление в принятой форме образа этого ещё не существующего объекта. Образ объекта или его составных частей может создаваться в воображении человека в результате творческого процесса или генерироваться в соответствии с некоторыми алгоритмами в процессе взаимодействия человека и ЭВМ. В любом случае инженерное проектирование начинается при наличии выраженной потребности общества в некоторых технических объектах, которыми могут быть объекты строительства, промышленные изделия или процессы.

Преобразование исходного описания в окончательное порождает ряд промежуточных описаний, подводящих итоги решения некоторых задач и используемых при обсуждении и принятии проектных решений для окончания или продолжения проектирования. Проектирование, при котором все проектные решения или их часть получают путём взаимодействия человека и ЭВМ, называют автоматизированным, в отличие от ручного (без использования ЭВМ) или автоматического (без участия человека на промежуточных этапах). Система, реализующая автоматизированное проектирование, представляет собой САПР.

Автоматическое проектирование возможно лишь в отдельных частных случаях для сравнительно несложных объектов. Превалирующим в настоящее время является автоматизированное проектирование.

В результате освоения дисциплины студент должен:

знать:
- основные задачи и этапы конструкторского проектирования;
- методы и средства автоматизации конструкторского и технологического проектирования;
- принципы классификации и кодирования технологической информации;
- особенности автоматизации технологической подготовки производства, включая использование станков с ЧПУ и гибких производственных систем.

уметь:
- разрабатывать программное обеспечение автоматизированных систем конструкторского и технологического проектирования;
- создавать и применять диалоговые пользовательские интерфейсы в составе САПР и АСТПП.

Создание объектов машиностроения осуществляется последовательно и включает следующие этапы: обоснование необходимости создания объекта, предпроектные исследования, проектирование и конструирование, технологическую подготовку производства, изготовление, наладку и ввод в эксплуатацию. К этапам проектирования относятся стадии конструирования и технологической подготовки производства.

Технологии комплексной компьютеризации сфер промышленного производства, цель которых – унификация и стандартизация спецификаций промышленной продукции на всех этапах её жизненного цикла, называют CALS-технологиями. Основные спецификации представлены проектной, технологической, производственной, маркетинговой, эксплуатационной документацией. В CALS-системах предусмотрены хранение, обработка и передача информации в компьютерных средах, оперативный доступ к данным в нужное время и в нужном месте.

Применение CALS-технологий позволяет существенно сократить объёмы проектных работ, так как описания многих составных частей оборудования, машин и систем, проектировавшихся ранее, хранятся в унифицированных форматах данных сетевых серверов, доступных любому пользователю технологий CALS. Существенно облегчается решение проблем ремонтопригодности, интеграции продукции в различного рода системы и среды, адаптации к меняющимся условиям эксплуатации, специализации проектных организаций и т.п.

CALS-технологии подразумевают использование различных CAD/CAM/CAE/PDM-систем. Отдельные модули этих систем в рамках одного предприятия позволяют осуществлять управление проектом (PDM-системы), инженерные расчёты, анализ, моделирование и оптимизацию проектных решений (CAE-системы), двух- и трёхмерное проектирование деталей и сборочных единиц (CAD-системы), разработку технологических процессов, синтез управляющих программ для технологического оборудования с ЧПУ, моделирование процессов обработки, в том числе построение траекторий относительного движения инструмента и заготовки в процессе обработки, расчёт норм времени обработки (CAM-системы).`,
        content_en: `EDUCATIONAL AND METHODOLOGICAL COMPLEX
on the discipline "Automation of design and technological design"

This educational and methodological complex is intended for students of technical areas of training studying the discipline "Automation of design and technological design". The discipline is aimed at forming students' systematic understanding of modern methods and means of automation of design processes and technological preparation of production in mechanical engineering.

Design is one of the key stages of the product life cycle and includes the search, justification and documentation of functional and design solutions. These solutions are formed in the form of a functional structure of the product and are subsequently materialized using technological prescriptions that ensure the fulfillment of all specified functional requirements.

In the design process, not only product drawings are developed, but also technological processes for its manufacture. Thus, the design stage answers the question "what is the product", and the stage of technological preparation of production - "how can this product be manufactured".

Design of a technical object is the creation, transformation and representation in an accepted form of an image of this not yet existing object. The image of an object or its components can be created in the human imagination as a result of a creative process or generated in accordance with certain algorithms in the process of interaction between a person and a computer. In any case, engineering design begins when there is an expressed need of society for certain technical objects, which can be construction objects, industrial products or processes.

The transformation of the initial description into the final one generates a number of intermediate descriptions that summarize the solution of some tasks and are used in the discussion and adoption of design decisions to complete or continue design. Design in which all design decisions or part of them are obtained through the interaction of a person and a computer is called automated, in contrast to manual (without the use of a computer) or automatic (without human participation at intermediate stages). A system that implements automated design is a CAD system.

Automatic design is possible only in individual special cases for relatively simple objects. The prevailing at present is automated design.

As a result of mastering the discipline, the student should:

know:
- main tasks and stages of design design;
- methods and means of automation of design and technological design;
- principles of classification and coding of technological information;
- features of automation of technological preparation of production, including the use of CNC machines and flexible production systems.

be able to:
- develop software for automated systems of design and technological design;
- create and apply dialog user interfaces as part of CAD and ASTPP.

The creation of mechanical engineering objects is carried out sequentially and includes the following stages: justification of the need to create an object, pre-project research, design and construction, technological preparation of production, manufacture, adjustment and commissioning. The design stages include the stages of construction and technological preparation of production.

Technologies of comprehensive computerization of industrial production spheres, the purpose of which is the unification and standardization of industrial product specifications at all stages of its life cycle, are called CALS technologies. The main specifications are represented by design, technological, production, marketing, operational documentation. CALS systems provide for storage, processing and transmission of information in computer environments, operational access to data at the right time and in the right place.

The application of CALS technologies allows to significantly reduce the volume of design work, since descriptions of many components of equipment, machines and systems designed earlier are stored in unified data formats of network servers accessible to any user of CALS technologies. The solution of problems of maintainability, integration of products into various systems and environments, adaptation to changing operating conditions, specialization of design organizations, etc. is significantly facilitated.

CALS technologies imply the use of various CAD/CAM/CAE/PDM systems. Individual modules of these systems within one enterprise allow project management (PDM systems), engineering calculations, analysis, modeling and optimization of design solutions (CAE systems), two- and three-dimensional design of parts and assembly units (CAD systems), development of technological processes, synthesis of control programs for technological equipment with CNC, modeling of processing processes, including the construction of trajectories of relative movement of the tool and workpiece during processing, calculation of processing time standards (CAM systems).`
      },
      {
        id: 'cals-1',
        title: '1.1. CALS-ТЕХНОЛОГИИ И УПРАВЛЕНИЕ ЖИЗНЕННЫМ ЦИКЛОМ ИЗДЕЛИЯ. ВОЗНИКНОВЕНИЕ И ЭВОЛЮЦИЯ КОНЦЕПЦИИ CALS',
        title_en: '1.1. CALS TECHNOLOGIES AND PRODUCT LIFECYCLE MANAGEMENT. ORIGIN AND EVOLUTION OF CALS CONCEPT',
        content: `Концепция CALS (Computer Aided Logistic Support) возникла в оборонной промышленности и первоначально была ориентирована на автоматизацию логистических процессов. Впервые работы по созданию интегрированных систем, поддерживающих жизненный цикл продукции, были начаты в оборонном комплексе. Предполагалось, что реализация новой концепции, получившей обозначение САLS (Сomputer Аided Logistic Support – компьютерная поддержка процесса поставок), позволит сократить затраты на организацию информационного взаимодействия государственных учреждений с частными фирмами в процессах разработки, поставок и эксплуатации военной техники.

Поскольку под логистикой обычно понимают дисциплину, посвящённую вопросам снабжения и управления запасами, а функции CALS намного шире и связаны со всеми этапами жизненного цикла промышленных изделий, применяют и более соответствующую предмету расшифровку аббревиатуры CALS – Continuous Acquisition and Life Cycle Support – непрерывные поставки и информационная поддержка жизненного цикла продукции.

Современная трактовка CALS основывается на расшифровке Continuous Acquisition and Life Cycle Support, что подчёркивает непрерывность информационного взаимодействия с заказчиком и системную информационную поддержку всех стадий жизненного цикла продукции. В российской практике данная концепция известна как ИПИ — информационная поддержка жизненного цикла изделий.

Первая часть – Continuous Аcqusition (непрерывные поставки) означает непрерывность информационного взаимодействия с заказчиком в ходе формирования заказа, процесса поставки и т.д. Вторая часть – Life Сусlе Support (поддержка жизненного цикла изделия) – означает системность подхода к информационной поддержке всех процессов жизненного цикла изделия, в том числе, процессов эксплуатации, обслуживания, ремонта и утилизации и т.д. Русскоязычное наименование этой концепции и стратегии – ИПИ (Информационная Поддержка жизненного цикла Изделий) или КСПИ (компьютерное сопровождение и поддержка изделий).

Поскольку термин САLS всегда носил военный оттенок, в гражданской сфере широкое распространение получили термины Product Life Сусlе Support (РLСS) или Рroduct Life Маnagement (РLМ) «поддержка жизненного цикла изделия» или «управление жизненным циклом изделия». В гражданской промышленности широкое распространение получили термины PLM (Product Lifecycle Management) и PLCS (Product Life Cycle Support), отражающие идеологию управления данными и процессами, связанными с изделием на протяжении всего периода его существования.

Эволюция концепции CALS прошла несколько этапов. В дальнейшем область применения CALS значительно расширилась и охватила все этапы жизненного цикла изделия — от проектирования до утилизации. Изначально она была ориентирована на решение задач логистики в оборонной промышленности, но постепенно расширила свою область применения, охватив все этапы жизненного цикла продукции от проектирования до утилизации. Современные CALS-технологии представляют собой комплексный подход к управлению информацией о продукции на всех этапах её существования.`,
        content_en: `The CALS concept (Computer Aided Logistic Support) arose in the defense industry and was initially focused on the automation of logistics processes. For the first time, work on creating integrated systems supporting the product life cycle was started in the defense complex. It was assumed that the implementation of the new concept, which received the designation CALS (Computer Aided Logistic Support - computer support for the supply process), would reduce the costs of organizing information interaction between government institutions and private firms in the processes of development, supply and operation of military equipment.

Since logistics is usually understood as a discipline dedicated to supply and inventory management issues, and CALS functions are much broader and related to all stages of the life cycle of industrial products, a more appropriate decoding of the CALS abbreviation is also used - Continuous Acquisition and Life Cycle Support - continuous supply and information support of the product life cycle.

The modern interpretation of CALS is based on the decoding of Continuous Acquisition and Life Cycle Support, which emphasizes the continuity of information interaction with the customer and systematic information support of all stages of the product life cycle. In Russian practice, this concept is known as IPI - information support of the product life cycle.

The first part - Continuous Acquisition (continuous supply) means the continuity of information interaction with the customer during order formation, supply process, etc. The second part - Life Cycle Support (product life cycle support) - means a systematic approach to information support of all processes of the product life cycle, including operation, maintenance, repair and disposal processes, etc. The Russian name of this concept and strategy is IPI (Information Support of Product Life Cycle) or KSPI (computer support and product support).

Since the term CALS has always had a military connotation, in the civilian sphere the terms Product Life Cycle Support (PLCS) or Product Life Management (PLM) "product life cycle support" or "product life cycle management" have become widespread. In the civilian industry, the terms PLM (Product Lifecycle Management) and PLCS (Product Life Cycle Support) have become widespread, reflecting the ideology of managing data and processes related to the product throughout its existence.

The evolution of the CALS concept has gone through several stages. In the future, the scope of CALS has significantly expanded and covered all stages of the product life cycle - from design to disposal. Initially, it was focused on solving logistics problems in the defense industry, but gradually expanded its scope, covering all stages of the product life cycle from design to disposal. Modern CALS technologies are a comprehensive approach to managing product information at all stages of its existence.`
      },
      {
        id: 'cals-2',
        title: '1.2. СТАНДАРТЫ CALS-ТЕХНОЛОГИЙ',
        title_en: '1.2. CALS TECHNOLOGY STANDARDS',
        content: `Эффективное внедрение CALS-технологий невозможно без развитой системы стандартизации. Внедрение САLS-технологии – сложная, многоплановая и комплексная проблема, в которой одно из ключевых мест принадлежит стандартизации.

Нормативная база должна обеспечивать унификацию представления данных, совместимость программных средств и интеграцию информационных систем различных уровней. Нормативная база в области САLS-технологий должна, в частности, обеспечивать:
− регламентацию непрерывной компьютеризированной поддержки жизненного цикла создания и экспорта сложной наукоёмкой продукции с учётом требований международных и зарубежных стандартов;
− формирование стандартизованного комплекса технологий работы с данными, включая данные о самом продукте, процессах его создания и среде;
− создание, внедрение и эксплуатацию типовых программно-аппаратных средств;
− интеграцию информационных систем различных уровней и видов, систем САПР и АСУП на основе применения технологии открытых систем и методов функциональной стандартизации.

К ключевым международным стандартам CALS относятся:

ISO 10303 (STEP) — стандарт для представления и обмена данными о продукции. STEP обеспечивает нейтральный формат для обмена данными между различными CAD-системами, что критически важно для интеграции в рамках CALS-технологий.

ISO 13584 (PLIB) — стандарт для библиотек промышленных компонентов. PLIB определяет структуру и формат представления данных о стандартных и типовых элементах, используемых в проектировании.

ISO 15926 — стандарт для управления данными жизненного цикла промышленных объектов. Этот стандарт обеспечивает единообразное представление данных о сложных технических системах на протяжении всего их жизненного цикла.

S1000D — стандарт для электронной эксплуатационной документации. S1000D определяет структуру и формат создания, управления и публикации технической документации в цифровом виде.

За рубежом работы проводятся в рамках ИСО ТК 184. В США и других странах НАТО разработанные нормативные документы включают международные стандарты (ИСО), федеральные стандарты США (FIPS), военные стандарты США (МIL), стандарты стран НАТО.

В Российской Федерации работы по стандартизации CALS координируются техническим комитетом ТК 431, функционирующим при Росстандарте. В России работы по внедрению и стандартизации САLS-технологий находятся на начальном этапе. В настоящее время уже утверждены первые стандарты в области CALS. Создан и уже действует технический комитет, основной задачей которого является разработка стандартов в области CALS.`,
        content_en: `Effective implementation of CALS technologies is impossible without a developed standardization system. The implementation of CALS technology is a complex, multifaceted and comprehensive problem, in which one of the key places belongs to standardization.

The regulatory framework should ensure the unification of data representation, compatibility of software tools and integration of information systems of various levels. The regulatory framework in the field of CALS technologies should, in particular, ensure:
- regulation of continuous computerized support of the life cycle of creation and export of complex high-tech products, taking into account the requirements of international and foreign standards;
- formation of a standardized set of data processing technologies, including data about the product itself, the processes of its creation and the environment;
- creation, implementation and operation of typical software and hardware;
- integration of information systems of various levels and types, CAD and ASUP systems based on the application of open systems technology and functional standardization methods.

Key international CALS standards include:

ISO 10303 (STEP) - standard for representation and exchange of product data. STEP provides a neutral format for data exchange between different CAD systems, which is critically important for integration within CALS technologies.

ISO 13584 (PLIB) - standard for industrial component libraries. PLIB defines the structure and format of data representation for standard and typical elements used in design.

ISO 15926 - standard for managing life cycle data of industrial facilities. This standard ensures uniform representation of data about complex technical systems throughout their life cycle.

S1000D - standard for electronic operational documentation. S1000D defines the structure and format for creating, managing and publishing technical documentation in digital form.

Abroad, work is carried out within the framework of ISO TC 184. In the USA and other NATO countries, the developed regulatory documents include international standards (ISO), US federal standards (FIPS), US military standards (MIL), NATO country standards.

In the Russian Federation, CALS standardization work is coordinated by technical committee TC 431, operating under Rosstandart. In Russia, work on the implementation and standardization of CALS technologies is at an initial stage. Currently, the first standards in the field of CALS have already been approved. A technical committee has been created and is already operating, the main task of which is to develop standards in the field of CALS.`
      },
      {
        id: 'cals-3',
        title: '1.3. СТРУКТУРА ИНТЕГРИРОВАННОЙ ИНФОРМАЦИОННОЙ СРЕДЫ',
        title_en: '1.3. STRUCTURE OF INTEGRATED INFORMATION ENVIRONMENT',
        content: `Принципы и технологии САLS находят всё более широкое применение в промышленности, и в первую очередь на предприятиях оборонного комплекса, поставляющих свою продукцию на внешний рынок.

Ядро ИПИ-технологии составляет интегрированная информационная среда (ИИС).

ИИС представляет собой хранилище данных, существующее в сетевой компьютерной системе, охватывающей все службы и подразделения предприятия, связанные с процессами жизненного цикла (ЖЦ) изделий. В ИИС действует единая система правил представления, хранения и обмена информацией. В соответствии с этими правилами в ИИС протекают информационные процессы, сопровождающие и поддерживающие ЖЦ изделия на всех его этапах.

Как минимум, ИИС должна включать в свой состав две базы данных: общую базу данных об изделии (изделиях) (ОБДИ) и общую базу данных о предприятии (ОБДП).

С ОБДИ связаны все процессы на всех стадиях ЖЦ. ОБДИ обеспечивает информационное обслуживание и поддержку деятельности:
− заказчиков (владельцев) изделия;
− разработчиков (конструкторов), технологов, управленческого и производственного персонала предприятия – изготовителя;
− эксплуатационного и ремонтного персонала заказчика и специализированных служб.

ОБДП имеет информационные связи с процессами технологической и организационно – экономической подготовки производства и собственно производством (включая процессы отгрузки и транспортировки готовой продукции).`,
        content_en: `The principles and technologies of CALS are finding increasingly wide application in industry, and primarily at enterprises of the defense complex that supply their products to the external market.

The core of IPI technology is the integrated information environment (IIS).

IIS is a data repository that exists in a networked computer system covering all services and divisions of the enterprise related to product life cycle (PLC) processes. IIS operates a unified system of rules for representation, storage and exchange of information. In accordance with these rules, information processes flow in IIS that accompany and support the product life cycle at all its stages.

At a minimum, IIS should include two databases: a common product database (CPD) and a common enterprise database (CED).

All processes at all stages of the life cycle are connected to CPD. CPD provides information services and support for activities:
- customers (owners) of the product;
- developers (designers), technologists, management and production personnel of the manufacturer enterprise;
- operational and repair personnel of the customer and specialized services.

CED has information links with the processes of technological and organizational-economic preparation of production and the production itself (including the processes of shipment and transportation of finished products).`
      },
      {
        id: 'cals-4',
        title: '1.4. ЭФФЕКТИВНОСТЬ ВНЕДРЕНИЯ CALS-ТЕХНОЛОГИЙ',
        title_en: '1.4. EFFICIENCY OF CALS TECHNOLOGY IMPLEMENTATION',
        content: `Применение CALS-технологий обеспечивает значительное повышение эффективности производства за счёт сокращения трудоёмкости проектных и технологических работ, уменьшения сроков вывода изделий на рынок, снижения количества ошибок и конструктивных изменений, а также повышения качества эксплуатационной документации.

Анализ информационных материалов, опубликованных в традиционной печати и в сети Интернет, позволил выявить ряд основных аспектов, определяющих эффективность применения САLS-технологий. К их числу относятся:
− компьютерная автоматизация, позволяющая повысить производительность основных процессов и операций создания информации;
− информационная интеграция процессов, обеспечивающая совместное и многократное использование одних и тех же данных. Интеграция достигается минимизацией числа и сложности вспомогательных процессов и операций, связанных с поиском, преобразованием и передачей информации;
− переход к безбумажной организации процессов и применение новых моделей их организации.

Из этих аспектов можно выделить конкретные факторы, непосредственно влияющие на экономические показатели производства, применяющего САLS-технологии:
− сокращение затрат и трудоёмкости процессов технической подготовки и освоения производства новых изделий;
− сокращение календарных сроков вывода новых конкурентоспособных изделий на рынок;
− сокращение доли брака и затрат, связанных с внесением изменений в конструкцию;
− увеличение объёмов продаж изделий, снабжённых электронной технической документацией;
− сокращение затрат на эксплуатацию, обслуживание и ремонты изделий.

Приведём некоторые количественные оценки эффективности внедрения САLS в промышленности США:
− прямое сокращение затрат на проектирование – 10 … 30%;
− сокращение времени вывода новых изделий на рынок – 25 … 75%;
− сокращение доли брака и объёма конструктивных изменений – 23 … 73%;
− сокращение затрат на подготовку технической документации – до 40%;
− сокращение затрат на разработку эксплуатационной документации – до 30%;
− сокращение времени разработки изделий – 40 … 60%.`,
        content_en: `The application of CALS technologies ensures a significant increase in production efficiency by reducing the labor intensity of design and technological work, reducing the time to market products, reducing the number of errors and design changes, as well as improving the quality of operational documentation.

Analysis of information materials published in traditional print and on the Internet has made it possible to identify a number of main aspects that determine the effectiveness of CALS technology application. These include:
- computer automation, which allows to increase the productivity of the main processes and operations of information creation;
- information integration of processes, ensuring joint and multiple use of the same data. Integration is achieved by minimizing the number and complexity of auxiliary processes and operations related to search, transformation and transmission of information;
- transition to paperless organization of processes and application of new models of their organization.

From these aspects, specific factors can be identified that directly affect the economic indicators of production using CALS technologies:
- reduction of costs and labor intensity of processes of technical preparation and development of production of new products;
- reduction of calendar terms for bringing new competitive products to market;
- reduction of the share of defects and costs associated with making changes to the design;
- increase in sales volumes of products equipped with electronic technical documentation;
- reduction of costs for operation, maintenance and repairs of products.

Let us give some quantitative estimates of the effectiveness of CALS implementation in US industry:
- direct reduction of design costs - 10 ... 30%;
- reduction of time to market for new products - 25 ... 75%;
- reduction of the share of defects and the volume of design changes - 23 ... 73%;
- reduction of costs for preparation of technical documentation - up to 40%;
- reduction of costs for development of operational documentation - up to 30%;
- reduction of product development time - 40 ... 60%.`
      },
      {
        id: 'cals-5',
        title: '1.5. АВТОМАТИЗИРОВАННЫЕ ИНФОРМАЦИОННЫЕ СИСТЕМЫ – ОСНОВА CALS-ТЕХНОЛОГИЙ',
        title_en: '1.5. AUTOMATED INFORMATION SYSTEMS - THE BASIS OF CALS TECHNOLOGIES',
        content: `Компьютерные системы автоматизации проведения научно-исследовательских и опытно-конструкторских работ, конструкторской и технологической подготовки производства часто ещё называют автоматизированными информационными системами (АИС).

В качестве признаков классификации АИС используются: область применения, охватываемая территория, организация информационных процессов, направление деятельности, назначения, структура и др.

В зависимости от организации информационных процессов, АИС делятся на два больших класса: управляющие и информационные (автоматизированные системы научных исследований (АСНИ), САПР, экспертные системы (ЭС) и др.).

По целевому назначению АИС классифицируются на:
− бухгалтерские (accounting information system – AIS);
− административные (management information system – MIS);
− информационные системы руководителей (ИСР, или executive information system – EIS);
− склады данных (data warehouses);
− системы автоматизированного проектирования (САПР, или CAD/CAE);
− автоматизированные системы управления производством (АСУП, или CAM);
− системы поддержки решений (СПР, или decision support systems – DSS);
− экспертные системы (ЭС, или expert system – ES);
− системы конечного пользователя (СКП, или end user system – EUS).

По структуре АИС можно разделить на две части: функциональную и обеспечивающую.

Функциональная часть обеспечивает реализацию определённых функций управления. К функциональным подсистемам относятся: техническая подготовка производства; подготовка оперативного управления; подготовка материального снабжения; подготовка сбыта и реализации готовой продукции; подготовка управления кадрами; подготовка управления бухучётом, отдел кадров.

Обеспечивающие подсистемы делятся на:
− программное обеспечение;
− информационное обеспечение;
− техническое обеспечение;
− организационное обеспечение;
− математическое обеспечение;
− лингвистическое обеспечение.`,
        content_en: `Computer systems for automation of research and development work, design and technological preparation of production are often also called automated information systems (AIS).

The following are used as classification features of AIS: field of application, territory covered, organization of information processes, direction of activity, purpose, structure, etc.

Depending on the organization of information processes, AIS are divided into two large classes: control and information (automated research systems (ARS), CAD, expert systems (ES), etc.).

By purpose, AIS are classified into:
- accounting (accounting information system - AIS);
- administrative (management information system - MIS);
- executive information systems (EIS, or executive information system - EIS);
- data warehouses;
- computer-aided design systems (CAD, or CAD/CAE);
- automated production management systems (APMS, or CAM);
- decision support systems (DSS, or decision support systems - DSS);
- expert systems (ES, or expert system - ES);
- end user systems (EUS, or end user system - EUS).

By structure, AIS can be divided into two parts: functional and supporting.

The functional part ensures the implementation of certain management functions. Functional subsystems include: technical preparation of production; preparation of operational management; preparation of material supply; preparation of sales and marketing of finished products; preparation of personnel management; preparation of accounting management, personnel department.

Supporting subsystems are divided into:
- software;
- information support;
- technical support;
- organizational support;
- mathematical support;
- linguistic support.`
      },
      {
        id: 'cals-6',
        title: '1.6. СИСТЕМЫ АВТОМАТИЗИРОВАННОГО ПРОЕКТИРОВАНИЯ И ИХ МЕСТО СРЕДИ ДРУГИХ АВТОМАТИЗИРОВАННЫХ СИСТЕМ',
        title_en: '1.6. COMPUTER-AIDED DESIGN SYSTEMS AND THEIR PLACE AMONG OTHER AUTOMATED SYSTEMS',
        content: `Жизненный цикл промышленных изделий включает ряд этапов, начиная от зарождения идеи нового продукта до утилизации по окончании срока его использования. Основные этапы жизненного цикла изделия:
- Процесс разработки
- Процесс производства
- Эксплуатация
- Утилизация

К ним относятся этапы проектирования, технологической подготовки производства (ТПП), собственно производства, реализации продукции, эксплуатации и, наконец, утилизации.

Автоматизация проектирования осуществляется САПР. Принято выделять в САПР машиностроительных отраслей промышленности системы функционального, конструкторского и технологического проектирования.

Первые из них называют системами расчётов и инженерного анализа или системами САЕ (Computer Aided Engineering).

Системы конструкторского проектирования называют системами CAD (Computer Aided Design).

Проектирование технологических процессов составляет часть технологической подготовки производства и выполняется в системах САМ (Computer Aided Manufacturing).

Функции координации работы систем CAE/CAD/CAM, управления проектными данными и проектированием возложены на систему управления проектными данными PDM (Product Data Management).

На этапе производства информационная поддержка осуществляется автоматизированными системами управления предприятием (АСУП) и автоматизированными системами управления технологическими процессами (АСУ ТП).`,
        content_en: `The life cycle of industrial products includes a number of stages, from the birth of an idea for a new product to disposal at the end of its service life. The main stages of the product life cycle:
- Development process
- Production process
- Operation
- Disposal

These include the stages of design, technological preparation of production (TPP), production itself, product sales, operation and, finally, disposal.

Design automation is carried out by CAD systems. It is customary to distinguish in CAD systems of mechanical engineering industries systems of functional, design and technological design.

The first of them are called calculation and engineering analysis systems or CAE systems (Computer Aided Engineering).

Design design systems are called CAD systems (Computer Aided Design).

Design of technological processes is part of the technological preparation of production and is performed in CAM systems (Computer Aided Manufacturing).

The functions of coordinating the work of CAE/CAD/CAM systems, managing project data and design are assigned to the product data management system PDM (Product Data Management).

At the production stage, information support is carried out by automated enterprise management systems (AEMS) and automated process control systems (APCS).`
      },
      {
        id: 'construct-1',
        title: '2. АВТОМАТИЗАЦИЯ КОНСТРУКТОРСКОГО ПРОЕКТИРОВАНИЯ. 2.1. ПОСЛЕДОВАТЕЛЬНОСТЬ КОНСТРУИРОВАНИЯ',
        title_en: '2. AUTOMATION OF DESIGN DESIGN. 2.1. CONSTRUCTION SEQUENCE',
        content: `Процесс конструирования включает анализ объекта проектирования, структурный синтез, параметрический синтез, расчёты, определение оптимальных режимов работы и оформление конструкторской документации.

Во всех отраслях промышленности установлены следующие стадии разработки конструкторской документации: техническое задание (ТЗ), техническое предложение, эскизный проект, технический проект, рабочая документация. Часто стадии разработки технического проекта и рабочей документации объединяют в одну. Все перечисленные стадии подготовки технической документации являются результатом выполнения определённых этапов проектирования.

Этап эскизного проектирования (опытно-конструкторских работ – ОКР) включает определение основных параметров машины и её систем, проработку принципиальных конструкторских решений, изготовление и испытание макетов сборочных единиц машины.

Этап технического (рабочего) проектирования заключается в детальной проработке всех окончательных схемных, конструкторских и технологических решений и включает в ряде случаев, например при серийном производстве изделия, изготовление макета и опытного образца, а иногда и установочной серии машин.

Традиционно конструирование новых объектов осуществляют в следующей последовательности:

1. Анализ объекта проектирования и протекающих в нём технологических процессов.
Прежде всего необходимо проанализировать связь технологического процесса, свойств перерабатываемого материала и конечного продукта с конструкцией объекта.

2. Топологическое проектирование (структурный синтез) объекта.
Структурный синтез объекта – часть процесса конструирования, связанная с выбором варианта схемы объекта и его устройств. Структурный синтез выполняют по блочно-иерархическому принципу.

3. Параметрический синтез.
Параметрический синтез объекта решает задачу определения основных конструкционных (геометрических и механических) параметров объекта в целом, его отдельных механизмов, устройств и рабочих органов.

4. Определение оптимальных технологических режимов.
Исследование технологического процесса позволяет найти наивыгоднейшие параметры технологического режима (скорости, давления, температуры и т. д.), обеспечивающие его эффективность и высокое качество продукции.

5. Расчёты конструкций.
При техническом (рабочем) проектировании выполняют все расчёты, в частности, динамические расчёты, расчёты на прочность, жёсткость, устойчивость и, при необходимости, корректируют размеры.

6. Оформление конструкторской документации.
В задачи оформления конструкторской документации входит изготовление текстовых и графических документов.`,
        content_en: `The design process includes analysis of the design object, structural synthesis, parametric synthesis, calculations, determination of optimal operating modes and preparation of design documentation.

In all industries, the following stages of design documentation development are established: technical specification (TS), technical proposal, preliminary design, technical design, working documentation. Often the stages of technical design and working documentation are combined into one. All listed stages of technical documentation preparation are the result of performing certain design stages.

The preliminary design stage (research and development work - R&D) includes determining the main parameters of the machine and its systems, working out fundamental design solutions, manufacturing and testing of prototypes of machine assembly units.

The technical (working) design stage consists in detailed working out of all final schematic, design and technological solutions and includes in some cases, for example, in serial production of the product, manufacturing of a prototype and a prototype, and sometimes an installation series of machines.

Traditionally, the design of new objects is carried out in the following sequence:

1. Analysis of the design object and technological processes occurring in it.
First of all, it is necessary to analyze the relationship of the technological process, properties of the processed material and the final product with the design of the object.

2. Topological design (structural synthesis) of the object.
Structural synthesis of an object is a part of the design process associated with the choice of a variant of the object scheme and its devices. Structural synthesis is performed according to the block-hierarchical principle.

3. Parametric synthesis.
Parametric synthesis of an object solves the problem of determining the main structural (geometric and mechanical) parameters of the object as a whole, its individual mechanisms, devices and working bodies.

4. Determination of optimal technological modes.
The study of the technological process allows finding the most advantageous parameters of the technological mode (speeds, pressures, temperatures, etc.) that ensure its efficiency and high product quality.

5. Structural calculations.
During technical (working) design, all calculations are performed, in particular, dynamic calculations, strength, stiffness, stability calculations and, if necessary, dimensions are adjusted.

6. Preparation of design documentation.
The tasks of preparing design documentation include the manufacture of text and graphic documents.`
      },
      {
        id: 'construct-2',
        title: '2.1. АНАЛИЗ ОБЪЕКТА ПРОЕКТИРОВАНИЯ И ПРОТЕКАЮЩИХ В НЁМ ТЕХНОЛОГИЧЕСКИХ ПРОЦЕССОВ',
        title_en: '2.1. ANALYSIS OF THE DESIGN OBJECT AND TECHNOLOGICAL PROCESSES OCCURRING IN IT',
        content: `В качестве объектов конструирования будем рассматривать технологические машины.

Машины применяют для увеличения производительности общественного труда и облегчения физического труда человека при выполнении технологических процессов или отдельных операций.

Технологическая (или рабочая) машина представляет собой комплекс механизмов, предназначенных для выполнения технологического процесса в соответствии с заданной программой. В ходе технологического процесса под воздействием рабочих органов машины изменяются качественные показатели предмета труда (физические свойства, форма, положение); при этом затрачивается полезная работа.

В общем случае машина имеет следующие функциональные системы:
1. Корпус – основная несущая конструкция машины, закреплённая на фундаменте или установленная другим способом.
2. Устройства для подачи и отвода основных и вспомогательных материалов.
3. Исполнительные механизмы, рабочие органы которых выполняют необходимые для реализации заданного технологического процесса кинематические и силовые функции, производя полезную работу.
4. Привод машины, включающий двигатели и передаточные механизмы, преобразующие механические параметры двигателя в значения, необходимые для исполнительных механизмов.
5. Системы обогрева или охлаждения рабочих зон машины.
6. Система контроля технологических параметров и управления машиной.
7. Система и устройства смазочные.

Общую задачу проектирования машины можно сформулировать следующим образом: проектирование машины представляет собой комплекс работ по изысканиям, исследованиям, расчётам и конструированию с целью получения всей технической документации, необходимой для создания нового оборудования, в соответствии с требованиями задания.`,
        content_en: `As objects of design, we will consider technological machines.

Machines are used to increase the productivity of social labor and facilitate the physical labor of a person when performing technological processes or individual operations.

A technological (or working) machine is a complex of mechanisms designed to perform a technological process in accordance with a given program. During the technological process, under the influence of the working bodies of the machine, the qualitative indicators of the subject of labor (physical properties, shape, position) change; at the same time, useful work is expended.

In general, a machine has the following functional systems:
1. Body - the main load-bearing structure of the machine, fixed on the foundation or installed in another way.
2. Devices for feeding and removing main and auxiliary materials.
3. Actuating mechanisms, the working bodies of which perform the kinematic and force functions necessary for the implementation of a given technological process, producing useful work.
4. Machine drive, including engines and transmission mechanisms that convert the mechanical parameters of the engine into values necessary for actuating mechanisms.
5. Heating or cooling systems for machine working zones.
6. System for monitoring technological parameters and controlling the machine.
7. Lubrication system and devices.

The general task of machine design can be formulated as follows: machine design is a complex of works on research, research, calculations and design in order to obtain all technical documentation necessary for creating new equipment, in accordance with the requirements of the assignment.`
      },
      {
        id: 'construct-3',
        title: '2.2. ТОПОЛОГИЧЕСКОЕ ПРОЕКТИРОВАНИЕ',
        title_en: '2.2. TOPOLOGICAL DESIGN',
        content: `Структурный синтез объекта осуществляется при сочетании интеллектуальной, творческой деятельности конструктора и решения ряда вычислительных задач (компоновки, трассировки) на ЭВМ. Творческая деятельность конструктора базируется на следующих методах конструирования.

Метод проб и ошибок. Основным традиционным методом, которым пользуется конструктор в процессе получения технических решений, является метод проб и ошибок. Суть этого метода заключается в том, что на первом этапе формулируется исходное предложение (гипотеза) по разрабатываемой конструкции в виде её схемы или эскиза. Конструктор лишь интуитивно предполагает, что данный вариант окажется работоспособным. На втором этапе проверяется (например, с помощью моделирования или экспериментальных исследований) качество предложенного варианта. Обычно после первой пробы не удаётся получить требуемое проектное решение, тогда формируется второе предложение, которое учитывает ошибки, допущенные в первом предложении, и снова выполняется проверка работоспособности конструкции и т. д.

Конструктивная преемственность при проектировании выражается в использовании всего опыта, накопленного в машиностроении вообще и в химическом машиностроении в частности. Такой подход оправдан тем, что каждая машина, каждая сборочная единица – как правило, результат творчества нескольких поколений конструкторов, причём в новых конструкциях используют наиболее удачные и прогрессивные решения. По этой причине, например, при выборе общей схемы машины техническое задание обычно ориентирует конструктора на определённый отечественный или зарубежный прототип (аналог), технические показатели которого находятся на высоком уровне.

Метод трансформации и инверсии, предполагающий преобразование или обращение функций системы или её элементов, широко используют при конструировании оборудования. Примеры инверсии: изменение на обратные функций деталей конструкции (ведомая деталь делается ведущей, неподвижная – подвижной, направляющая – направляемой, охватывающая-охватываемой, внутренняя – внешней, верхняя – нижней и т. д.); изменение способов расположения деталей и элементов конструкции; изменение форм деталей (выпуклую поверхность заменяют вогнутой, наружный конус – внутренним).

Аналогия опирается на подобие конструкций в природе и технике. Широко применяется аналогия в роботостроении при разработке механических устройств робота и его «органов чувств». Наименее трудоёмким является заимствование конструктивных аналогов из других областей техники.

Метод «мозгового штурма» – метод коллективного генерирования технических решений. Создаётся группа специалистов – «генератор идей», включающая в себя специалистов смежных, а иногда даже далёких областей науки и техники. Это объясняется тем, что для специалистов отдельной области науки и техники существует «кризис идей», связанный с определённым «избытком информации» и ограничивающий направления совершенствования конструкции, а специалисты из других областей науки и техники могут привнести свежие идеи из своей области.

Задача компоновки. Решение задач компоновки конструктивных элементов высшего иерархического уровня из элементов низшего иерархического уровня в большинстве случаев наиболее трудоёмкая часть конструкторского проектирования, и иногда под компоновкой понимают собственно процесс конструирования. Задача компоновки машиностроительных узлов обычно состоит из двух частей: эскизной и рабочей. При решении эскизной части задачи компоновки по функциональной схеме разрабатывают общую конструкцию узла. На основе эскизной компоновки составляют рабочую компоновку с более детальной проработкой конструкции узла.

Задача трассировки выполняется после решения задачи размещения. Например, при проектировании радиоэлектронной аппаратуры с помощью трассировки определяется геометрия соединений (трасс соединений) элементов, например из условия минимизации суммарной длины соединений. При решении задачи трассировки исходной будет являться матрица положений элементов, а варьирование матрицы расстояний будет осуществляться за счёт изменения геометрии соединений.`,
        content_en: `Structural synthesis of an object is carried out by combining the intellectual, creative activity of the designer and solving a number of computational tasks (layout, routing) on a computer. The creative activity of the designer is based on the following design methods.

Trial and error method. The main traditional method used by the designer in the process of obtaining technical solutions is the trial and error method. The essence of this method is that at the first stage, an initial proposal (hypothesis) for the developed design is formulated in the form of its diagram or sketch. The designer only intuitively assumes that this option will be workable. At the second stage, the quality of the proposed option is checked (for example, using modeling or experimental research). Usually, after the first attempt, it is not possible to obtain the required design solution, then a second proposal is formed, which takes into account the errors made in the first proposal, and the workability of the design is checked again, etc.

Design continuity in design is expressed in the use of all experience accumulated in mechanical engineering in general and in chemical engineering in particular. This approach is justified by the fact that each machine, each assembly unit is, as a rule, the result of the creativity of several generations of designers, and the most successful and progressive solutions are used in new designs. For this reason, for example, when choosing a general machine scheme, the technical specification usually guides the designer to a certain domestic or foreign prototype (analog), the technical indicators of which are at a high level.

The method of transformation and inversion, which involves the transformation or reversal of the functions of a system or its elements, is widely used in equipment design. Examples of inversion: changing to reverse functions of structural parts (a driven part becomes a driving one, a stationary one becomes movable, a guiding one becomes guided, an embracing one becomes embraced, an internal one becomes external, an upper one becomes lower, etc.); changing the ways of arranging parts and structural elements; changing the shapes of parts (a convex surface is replaced by a concave one, an external cone by an internal one).

Analogy is based on the similarity of structures in nature and technology. Analogy is widely used in robotics when developing mechanical devices of a robot and its "sense organs". The least labor-intensive is borrowing structural analogs from other areas of technology.

The "brainstorming" method is a method of collective generation of technical solutions. A group of specialists is created - an "idea generator", including specialists from related, and sometimes even distant areas of science and technology. This is explained by the fact that for specialists in a separate field of science and technology, there is an "idea crisis" associated with a certain "information overload" and limiting the directions of design improvement, and specialists from other fields of science and technology can bring fresh ideas from their field.

Layout task. Solving layout tasks of structural elements of a higher hierarchical level from elements of a lower hierarchical level in most cases is the most labor-intensive part of design work, and sometimes layout is understood as the actual design process. The layout task of mechanical engineering units usually consists of two parts: sketch and working. When solving the sketch part of the layout task, the general design of the unit is developed according to the functional scheme. Based on the sketch layout, a working layout is compiled with more detailed development of the unit design.

The routing task is performed after solving the placement task. For example, when designing radio-electronic equipment, routing determines the geometry of connections (connection routes) of elements, for example, from the condition of minimizing the total length of connections. When solving the routing task, the matrix of element positions will be the initial one, and the variation of the distance matrix will be carried out by changing the geometry of connections.`
      },
      {
        id: 'construct-4',
        title: '2.3. ПАРАМЕТРИЧЕСКИЙ СИНТЕЗ',
        title_en: '2.3. PARAMETRIC SYNTHESIS',
        content: `Параметрический синтез направлен на определение оптимальных значений геометрических и механических параметров объекта. В большинстве случаев он формализуется в виде задачи оптимизации, решаемой с применением численных методов.

Параметрический синтез объекта решает задачу определения основных конструкционных (геометрических и механических) параметров объекта в целом, его отдельных механизмов, устройств и рабочих органов.

В большинстве случаев параметрический синтез является задачей оптимизационного типа: параметры машины должны быть определены таким образом, чтобы заданный или выбранный показатель эффективности имел оптимальное значение.

Геометрическая модель изделия может быть представлена аналитическими, алгебрологическими, каркасными или твёрдотельными моделями.

В алгоритмах геометрического проектирования фигурируют геометрические объекты, являющиеся исходными данными, промежуточными и окончательными результатами конструирования. Детали и узлы конструкции имеют самые разнообразные геометрические характеристики.

Геометрическая модель – совокупность сведений, однозначно определяющих форму геометрического объекта. Геометрические модели могут быть представлены совокупностью уравнений линий и поверхностей, алгебрологическими соотношениями, графами, списками, таблицами, описаниями на специальных графических языках.

Различают геометрические модели аналитические, алгебрологические, канонические, рецепторные, каркасные, кинематические и геометрические макромодели.

К типовым позиционным задачам относят: определение принадлежности точки плоской области, ограниченной замкнутыми контурами; определение координат точки пересечения прямой с криволинейным контуром или поверхностью; установление пересечения контуров и вычисление координат их точек пересечения; определение взаимного расположения плоских или пространственных областей.

К метрическим задачам относят, например, вычисление длины, площади, периметра, центра масс, моментов инерции.`,
        content_en: `Parametric synthesis is aimed at determining the optimal values of geometric and mechanical parameters of an object. In most cases, it is formalized as an optimization problem solved using numerical methods.

Parametric synthesis of an object solves the problem of determining the main structural (geometric and mechanical) parameters of the object as a whole, its individual mechanisms, devices and working bodies.

In most cases, parametric synthesis is an optimization-type problem: machine parameters must be determined in such a way that a given or selected efficiency indicator has an optimal value.

The geometric model of a product can be represented by analytical, algebraological, wireframe or solid models.

Geometric design algorithms involve geometric objects that are initial data, intermediate and final results of design. Parts and structural units have a wide variety of geometric characteristics.

A geometric model is a set of information that uniquely determines the shape of a geometric object. Geometric models can be represented by a set of equations of lines and surfaces, algebraological relations, graphs, lists, tables, descriptions in special graphic languages.

Geometric models are distinguished: analytical, algebraological, canonical, receptor, wireframe, kinematic and geometric macromodels.

Typical positional tasks include: determining the belonging of a point to a flat area bounded by closed contours; determining the coordinates of the intersection point of a straight line with a curvilinear contour or surface; establishing the intersection of contours and calculating the coordinates of their intersection points; determining the mutual arrangement of flat or spatial areas.

Metric tasks include, for example, calculating length, area, perimeter, center of mass, moments of inertia.`
      },
      {
        id: 'construct-5',
        title: '2.4. ТЕХНОЛОГИЯ ВИЗУАЛЬНОЙ ПАРАМЕТРИЗАЦИИ',
        title_en: '2.4. VISUAL PARAMETRIZATION TECHNOLOGY',
        content: `Технология визуальной параметризации заключается в том, что в процессе построения чертежа автоматически формируется математическая геометрическая модель, в которой фиксируются следующие параметры:
1) отношения между линиями – параллельность, перпендикулярность, касание и т.д.;
2) размеры – расстояние, радиус, угол и т.д.;
3) элементы оформления чертежа – размеры, штриховки, допуски, обозначения шероховатостей, тексты и т.п.

Таким образом, параллельно с графическим изображением чертежа формируется его математическая модель.

При изменении параметров происходят изменения конфигураций деталей, взаимные перемещения деталей в сборках, выполняются различные расчёты, может изменяться состав изделия (моделируются варианты исполнений). Инструменты параметризации позволяют избежать ошибок, а значит, повышают эффективность работы.

На параметрическом чертеже при перемещении линий построения или изменении их параметров (расстояний, радиусов и т.д.) линии изображения, размеры, штриховки и так далее следуют за вспомогательными линиями, изменяя облик чертежа. За несколько минут можно получить десятки рабочих чертежей разных типоразмеров изделия.

Необходимо создавать чертёж с взаимосвязанными видами, когда изменение параметров на одном виде приведет к соответствующим изменениям на других видах. Это исключает ошибки в проектировании.

Большой эффект может принести использование баз данных, позволяющих реализовывать в одном чертеже целые каталоги изделий. Это позволяет создавать элементы конструкций в полуавтоматическом режиме, задавая их параметры из баз данных.`,
        content_en: `Visual parametrization technology consists in the fact that in the process of drawing construction, a mathematical geometric model is automatically formed, in which the following parameters are fixed:
1) relationships between lines - parallelism, perpendicularity, tangency, etc.;
2) dimensions - distance, radius, angle, etc.;
3) drawing design elements - dimensions, hatching, tolerances, roughness designations, texts, etc.

Thus, in parallel with the graphic image of the drawing, its mathematical model is formed.

When parameters change, changes occur in the configurations of parts, mutual movements of parts in assemblies, various calculations are performed, the composition of the product may change (execution options are modeled). Parametrization tools allow you to avoid errors, which means they increase work efficiency.

On a parametric drawing, when moving construction lines or changing their parameters (distances, radii, etc.), image lines, dimensions, hatching, and so on follow the auxiliary lines, changing the appearance of the drawing. In a few minutes, you can get dozens of working drawings of different standard sizes of the product.

It is necessary to create a drawing with interconnected views, when changing parameters on one view will lead to corresponding changes on other views. This eliminates errors in design.

A great effect can be brought by the use of databases that allow implementing entire catalogs of products in one drawing. This allows you to create structural elements in a semi-automatic mode, setting their parameters from databases.`
      },
      {
        id: 'construct-6',
        title: '2.5. ИНЖЕНЕРНЫЕ РАСЧЁТЫ',
        title_en: '2.5. ENGINEERING CALCULATIONS',
        content: `Инженерные расчёты включают динамический анализ, расчёты на прочность, жёсткость и устойчивость. Современные CAE-системы используют метод конечных элементов и позволяют учитывать нелинейные эффекты, контактные взаимодействия и усталостную прочность.

В процессе конструирования необходимо выполнять различные расчёты. Поскольку методики расчёта, как правило, хорошо отработаны и известен набор формул, по которым необходимо проводить расчёты, этот этап наиболее хорошо поддается полной автоматизации.

Для технологических машин наиболее важными являются динамические расчёты и расчёты на прочность, жёсткость, устойчивость.

Машинный агрегат представляет собой систему, состоящую из машины-двигателя, передаточного механизма и технологической (рабочей) машины. Элементы системы находятся под воздействием внешних сил.

Различают две основные задачи динамики. К первой задаче, применительно к машинам, относится определение неизвестных внешних сил, действующих на звенья, и реакций в кинематических парах при известном законе движения машины. Эта задача составляет содержание силового расчёта механизмов, сюда относится и проблема уравновешивания масс.

Вторая задача состоит в изучении режима движения механизмов при известных массах их звеньев под действием заданных внешних сил. Сюда относятся вопросы определения энергозатрат и анализ их распределения в элементах системы, в частности нахождение общего и частных коэффициентов полезного действия, регулирование движения машины, например, расчёт маховика.

Силовой расчёт механизмов. Цель силового расчёта — нахождение уравновешивающих сил (моментов) и реакций в кинематических парах механизмов. Эти величины являются входными параметрами при расчётах на прочность звеньев механизмов и отдельных деталей машин, узлов трения, при выборе двигателя.

Уравновешивание масс. Динамические нагрузки, обусловленные силами инерции звеньев, передаются через кинематические пары на станину машины и её фундамент. Они вызывают дополнительные потери на трение в кинематических парах и, поскольку изменяются во времени, могут вызывать вибрацию звеньев и фундамента, быть источником шума.

При статической балансировке вращающихся масс установкой противовеса добиваются совпадения положения центра масс детали с её осью вращения.

При динамической балансировке, осуществляемой на специальных балансировочных станках или приспособлениях, установкой противовесов добиваются совпадения оси вращения с одной из главных центральных осей инерции вращающегося тела.

Метод конечных элементов (МКЭ) является основным инструментом современного инженерного анализа. Он позволяет решать сложные задачи прочности, теплопередачи, динамики и других физических процессов. МКЭ основан на дискретизации расчётной области на конечное число элементов, для каждого из которых решаются уравнения, описывающие физические процессы. Современные CAE-системы автоматизируют процесс построения сетки конечных элементов, задания граничных условий и анализа результатов, что значительно ускоряет процесс проектирования и повышает точность расчётов.`,
        content_en: `Engineering calculations include dynamic analysis, strength, stiffness and stability calculations. Modern CAE systems use the finite element method and allow taking into account nonlinear effects, contact interactions and fatigue strength.

In the design process, it is necessary to perform various calculations. Since calculation methods are usually well developed and a set of formulas is known, according to which calculations must be carried out, this stage is most amenable to full automation.

For technological machines, the most important are dynamic calculations and calculations for strength, stiffness, and stability.

A machine unit is a system consisting of a motor machine, a transmission mechanism and a technological (working) machine. System elements are under the influence of external forces.

There are two main tasks of dynamics. The first task, as applied to machines, includes determining unknown external forces acting on links and reactions in kinematic pairs with a known law of machine motion. This task constitutes the content of the force calculation of mechanisms, and the problem of mass balancing also belongs here.

The second task consists in studying the mode of motion of mechanisms with known masses of their links under the action of given external forces. This includes issues of determining energy costs and analyzing their distribution in system elements, in particular, finding general and partial efficiency coefficients, regulating machine motion, for example, calculating a flywheel.

Force calculation of mechanisms. The goal of force calculation is finding balancing forces (moments) and reactions in kinematic pairs of mechanisms. These quantities are input parameters in strength calculations of mechanism links and individual machine parts, friction units, when choosing an engine.

Mass balancing. Dynamic loads caused by inertial forces of links are transmitted through kinematic pairs to the machine frame and its foundation. They cause additional friction losses in kinematic pairs and, since they change over time, can cause vibration of links and foundation, be a source of noise.

During static balancing of rotating masses, by installing a counterweight, the position of the center of mass of the part is made to coincide with its axis of rotation.

During dynamic balancing, carried out on special balancing machines or devices, by installing counterweights, the axis of rotation is made to coincide with one of the main central axes of inertia of the rotating body.

The finite element method (FEM) is the main tool of modern engineering analysis. It allows solving complex problems of strength, heat transfer, dynamics and other physical processes. FEM is based on discretization of the calculation area into a finite number of elements, for each of which equations describing physical processes are solved. Modern CAE systems automate the process of building a finite element mesh, setting boundary conditions and analyzing results, which significantly speeds up the design process and increases calculation accuracy.`
      },
      {
        id: 'construct-7',
        title: '2.6. ОФОРМЛЕНИЕ КОНСТРУКТОРСКОЙ ДОКУМЕНТАЦИИ',
        title_en: '2.6. DESIGN DOCUMENTATION FORMATTING',
        content: `Задача данного этапа – оформление текстовой и графической документации, отражающей все полученные конструкторские решения и результаты расчётов. При автоматизации данного этапа главная задача разработчиков – создание максимально удобного интерфейса пользователя.

Интерфейс оформления чертежей должен удовлетворять следующим требованиям:
1. Иметь полный набор функций создания и редактирования чертежей, в том числе обозначений видов, разрезов и сечений.
2. Чертежи должны соответствовать ЕСКД и международным стандартам (ISO, DIN, АNSI).
3. Ввод и редактирования элементов должны включать динамические подсветки, привязки и контекстно-зависимые подсказки.
4. Должны быть предусмотрены разнообразные способы простановки размеров (линейные, размеры на окружности, угловые).
5. Должна быть предусмотрена возможность ввода и редактирования шероховатостей, надписей, в том числе специальных символов.
6. Должна быть предусмотрена возможность работы с растровым изображением.
7. Иметь функции копирования, переноса, симметрии.
8. Должна быть предусмотрена возможность создания «Выносного вида».
9. Иметь специализированные функции, ускоряющие ввод часто используемых элементов: отверстий, резьб и т.д.
10. Иметь комплекс команд для работы с основной надписью чертежа.
11. Иметь функции отмены действия и восстановления действия.
12. Иметь произвольные масштабы, работу по сетке.
13. Использовать технологию визуальной параметризации.

Интерфейс подготовки спецификаций должен удовлетворять следующим требованиям:
1. Иметь возможность автоматического формирования спецификаций.
2. Иметь возможность создания нестандартных шаблонов спецификаций.
3. Иметь возможность автоматического суммирования указанных колонок спецификации.
4. Иметь возможность создания многостраничных документов.
5. Иметь возможность автоматического изменения спецификации при изменении сборочного чертежа.`,
        content_en: `The task of this stage is the formatting of textual and graphic documentation reflecting all obtained design solutions and calculation results. When automating this stage, the main task of developers is to create the most convenient user interface.

The drawing formatting interface must meet the following requirements:
1. Have a complete set of functions for creating and editing drawings, including designations of views, sections and cuts.
2. Drawings must comply with ESKD and international standards (ISO, DIN, ANSI).
3. Input and editing of elements must include dynamic highlighting, snap points and context-dependent hints.
4. Various ways of dimensioning should be provided (linear, dimensions on a circle, angular).
5. The possibility of input and editing of roughness, inscriptions, including special symbols, should be provided.
6. The possibility of working with raster images should be provided.
7. Have functions of copying, moving, symmetry.
8. The possibility of creating a "Detail view" should be provided.
9. Have specialized functions that speed up the input of frequently used elements: holes, threads, etc.
10. Have a set of commands for working with the main inscription of the drawing.
11. Have functions of undo and redo.
12. Have arbitrary scales, work on a grid.
13. Use visual parametrization technology.

The specification preparation interface must meet the following requirements:
1. Have the ability to automatically generate specifications.
2. Have the ability to create non-standard specification templates.
3. Have the ability to automatically sum the specified columns of the specification.
4. Have the ability to create multi-page documents.
5. Have the ability to automatically change the specification when changing the assembly drawing.`
      },
      {
        id: 'tech-1',
        title: '3. АВТОМАТИЗАЦИЯ ТЕХНОЛОГИЧЕСКОЙ ПОДГОТОВКИ ПРОИЗВОДСТВА. ОСНОВНЫЕ ПОНЯТИЯ',
        title_en: '3. AUTOMATION OF TECHNOLOGICAL PRODUCTION PREPARATION. BASIC CONCEPTS',
        content: `Целью технологической подготовки производства является достижение в процессе изготовления продукции оптимального соотношения между затратами и получаемыми результатами.

Под технологической подготовкой производства (ТПП) в общем случае понимается комплекс работ по обеспечению технологичности конструкции запускаемого в производство изделия, проектированию технологических процессов и средств технологического обеспечения, расчёту технически обоснованных материальных и трудовых нормативов.

Процесс ТПП состоит из эвристических и формализованных методов. Эвристические методы базируются на различных идеях, интуитивном мышлении, способности к изобретательству. Формализованные методы, которые основываются на физико-математических закономерностях, широко используются при автоматизации ТПП.

Технологический процесс – часть производственного процесса, содержащая целенаправленные действия по изменению состояния предмета труда.

Законченная часть технологического процесса, выполняемая на одном рабочем месте, называется технологической операцией.

Процесс изготовления какого-либо объекта в машиностроении начинается с получения заготовки. Полученные заготовки направляют на механическую обработку, в процессе которой получают законченную деталь. Завершающим процессом в машиностроительном производстве является сборка изделия.`,
        content_en: `The goal of technological production preparation is to achieve an optimal ratio between costs and results obtained in the manufacturing process.

Technological production preparation (TPP) in the general case is understood as a set of works to ensure the manufacturability of the design of a product launched into production, design of technological processes and means of technological support, calculation of technically justified material and labor standards.

The TPP process consists of heuristic and formalized methods. Heuristic methods are based on various ideas, intuitive thinking, and the ability to invent. Formalized methods, which are based on physical and mathematical patterns, are widely used in TPP automation.

A technological process is a part of the production process containing purposeful actions to change the state of the subject of labor.

A completed part of a technological process performed at one workplace is called a technological operation.

The process of manufacturing any object in mechanical engineering begins with obtaining a blank. The obtained blanks are sent for mechanical processing, during which a finished part is obtained. The final process in mechanical engineering production is product assembly.`
      },
      {
        id: 'tech-2',
        title: '3.1. ТЕХНОЛОГИЧЕСКИЕ ПРОЦЕССЫ В МАШИНОСТРОЕНИИ',
        title_en: '3.1. TECHNOLOGICAL PROCESSES IN MECHANICAL ENGINEERING',
        content: `Получение заготовки:

Заготовки для производства деталей машин, механизмов и т.д. получают литьём, прокатом, штамповкой, ковкой и другими способами.

Литьё – процесс получения заготовки путём заливки в специальные формы материала, нагретого до жидкого состояния. Используется для получения корпусных деталей. Литьё позволяет получать заготовки сложной формы с минимальными отходами материала.

Ковка – процесс получения заготовки путём ударного воздействия на материал, нагретый до пластичного состояния. Ковка обеспечивает высокую прочность заготовок за счёт улучшения структуры металла.

Прокат – процесс получения заготовки путём прокатывания через специальные вальцы материала, нагретого до пластичного состояния. Основные профили, получаемые прокатом: уголок, швеллер, двутавр, пруток, труба. Прокат характеризуется высокой точностью размеров и хорошими механическими свойствами.

Штамповка – процесс получения заготовки путём ударного воздействия пуансона на листовой материал, помещаемый на матрицу. Различают холодную и горячую штамповку, а также плоскую и объёмную. Штамповка обеспечивает высокую производительность и точность размеров.

Технологические операции в механической обработке связаны с удалением слоя материала. Получение новых поверхностей путём отделения слоёв материала с образованием стружки называется обработкой резанием.

К общим видам обработки резанием относится так называемая лезвийная обработка. Лезвийная обработка осуществляется лезвийными инструментами, к которым относятся резцы, фрезы, свёрла.

Точение – лезвийная обработка с вращательным главным движением резания и возможностью изменения радиуса его траектории. Разновидности точения: обтачивание, растачивание, подрезание. Обтачивание – точение наружной поверхности с движением подачи вдоль образующей линии обрабатываемой поверхности. Растачивание – точение внутренней поверхности с движением подачи вдоль образующей поверхности. При глубине отверстия более 100…150 мм растачивают державочными резцами.

Осевая обработка – лезвийная обработка с вращательным главным движением резания при постоянном радиусе его траектории и движении подачи только вдоль оси главного движения резания. Разновидности осевой обработки – сверление, зенкерование, развёртывание.

Сверление – процесс получения отверстий. Сверло является более сложным, чем резец инструментом – имеет 5 лезвий. Для процесса сверления важным фактором является геометрия режущей части свёрл. Для различных технологий (размеры отверстий, материал заготовки, точность обработки и т.д.) используют различные способы заточки свёрл.

Зенкерование отверстий – обработка просверлённых отверстий для увеличения диаметра, а также обработка отверстий, отлитых или штампованных, осуществляемых специальным инструментом – зенкером. Зенкеры имеют, как правило, четыре режущие кромки, поэтому диаметр и прямолинейность отверстия, обработанного зенкером, выдерживаются точнее, чем при сверлении.

Развёртывание отверстий – технологическая операция окончательной обработки отверстий высокой точности, осуществляемая специальным инструментом – развёрткой. Развёртка имеет большое количество зубьев, одновременно участвующих в работе. Процесс характеризуется малой глубиной резания, что способствует получению низкой шероховатости.

Фрезерование – лезвийная обработка с вращательным главным движением резания при постоянном радиусе его траектории, сообщаемым инструменту, и хотя бы одним движением подачи, направленным перпендикулярно оси главного движения резания. В зависимости от вида лезвийного инструмента (фрезы) фрезерование может быть периферийным, торцовым, круговым.

Периферийное фрезерование – применяется для обработки плоских поверхностей цилиндрической или дисковой фрезой. При обработке ось фрезы параллельна обрабатываемой поверхности; работа производится зубьями, расположенными на цилиндрической поверхности фрезы.

Торцовое фрезерование – применяется для обработки плоских поверхностей торцовой фрезой. При торцовом фрезеровании ось фрезы перпендикулярна обрабатываемой поверхности; в работе участвуют зубья, расположенные как на цилиндрической, так и на торцовой поверхности фрезы. Торцовое фрезерование имеет ряд преимуществ по сравнению с цилиндрическим – обеспечивает более равномерное фрезерование.

Шлифование поверхностей – операция резания, осуществляемая абразивным инструментом (шлифовальным кругом) для целей черновой обработки заготовок. Наиболее распространенными видами шлифования являются круглое (наружное и внутреннее) – для обработки цилиндрических деталей, и плоское шлифование.`,
        content_en: `Obtaining a blank:

Blanks for the production of machine parts, mechanisms, etc. are obtained by casting, rolling, stamping, forging and other methods.

Casting is the process of obtaining a blank by pouring material heated to a liquid state into special molds. Used to obtain body parts. Casting allows obtaining blanks of complex shape with minimal material waste.

Forging is the process of obtaining a blank by impact on material heated to a plastic state. Forging provides high strength of blanks due to improved metal structure.

Rolling is the process of obtaining a blank by rolling material heated to a plastic state through special rolls. The main profiles obtained by rolling: angle, channel, I-beam, bar, pipe. Rolling is characterized by high dimensional accuracy and good mechanical properties.

Stamping is the process of obtaining a blank by impact of a punch on sheet material placed on a die. Cold and hot stamping are distinguished, as well as flat and volumetric. Stamping provides high productivity and dimensional accuracy.

Technological operations in mechanical processing are associated with the removal of a layer of material. Obtaining new surfaces by separating layers of material with the formation of chips is called cutting.

The so-called blade processing belongs to the general types of cutting. Blade processing is carried out by blade tools, which include cutters, milling cutters, drills.

Turning is blade processing with a rotational main cutting motion and the ability to change the radius of its trajectory. Varieties of turning: external turning, boring, facing. External turning is turning of the outer surface with feed motion along the generatrix of the machined surface. Boring is turning of the inner surface with feed motion along the generatrix of the surface. When the hole depth is more than 100...150 mm, boring is performed with shank cutters.

Axial processing is blade processing with a rotational main cutting motion at a constant radius of its trajectory and feed motion only along the axis of the main cutting motion. Varieties of axial processing - drilling, countersinking, reaming.

Drilling is the process of obtaining holes. A drill is a more complex tool than a cutter - it has 5 blades. For the drilling process, an important factor is the geometry of the cutting part of drills. For various technologies (hole sizes, workpiece material, processing accuracy, etc.), various methods of drill sharpening are used.

Countersinking of holes is the processing of drilled holes to increase the diameter, as well as the processing of holes cast or stamped, carried out by a special tool - a countersink. Countersinks usually have four cutting edges, so the diameter and straightness of a hole processed by a countersink are maintained more accurately than when drilling.

Reaming of holes is a technological operation of final processing of high-precision holes, carried out by a special tool - a reamer. A reamer has a large number of teeth simultaneously participating in work. The process is characterized by a small cutting depth, which contributes to obtaining low roughness.

Milling is blade processing with a rotational main cutting motion at a constant radius of its trajectory, imparted to the tool, and at least one feed motion directed perpendicular to the axis of the main cutting motion. Depending on the type of blade tool (milling cutter), milling can be peripheral, face, or circular.

Peripheral milling is used for processing flat surfaces with a cylindrical or disk milling cutter. During processing, the axis of the milling cutter is parallel to the machined surface; work is performed by teeth located on the cylindrical surface of the milling cutter.

Face milling is used for processing flat surfaces with a face milling cutter. In face milling, the axis of the milling cutter is perpendicular to the machined surface; teeth located both on the cylindrical and face surfaces of the milling cutter participate in the work. Face milling has a number of advantages over cylindrical milling - it provides more uniform milling.

Surface grinding is a cutting operation performed by an abrasive tool (grinding wheel) for rough processing of blanks. The most common types of grinding are round (external and internal) - for processing cylindrical parts, and flat grinding.`
      },
      {
        id: 'tech-3',
        title: '3.2. ТЕХНОЛОГИЯ СБОРОЧНЫХ ПРОЦЕССОВ',
        title_en: '3.2. ASSEMBLY PROCESS TECHNOLOGY',
        content: `Процесс сборки составляет 20…50% в общей трудоёмкости изготовления машины. Сборку подразделяют на узловую и общую. Объектом узловой сборки являются сборочные элементы машины, объектом общей сборки – сама машина. Детали поступают на сборку после их окончательного технического контроля.

Процесс сборки состоит из двух основных частей: подготовки деталей к сборке и собственно сборочных операций. К подготовительным работам относятся: различные слесарно-пригоночные работы, выполняемые при необходимости; окраска отдельных деталей; очистка и промывка деталей; смазывание сопрягаемых деталей, если это необходимо по техническим условиям.

К собственно сборочным работам относится процесс соединения сопрягаемых деталей и узлов с обеспечением правильного их взаимного положения и определённой посадки.

Различают следующие виды соединений:
1) неподвижные разъёмные – которые можно разобрать без повреждения соединяемых и скрепляемых деталей (например, резьбовые)
2) неподвижные неразъёмные – разъединение которых связано с повреждением или полным разрушением деталей (такие соединения получают посадкой с натягом, развальцовкой, сваркой, пайкой, клепкой, склеиванием)
3) подвижные разъёмные – соединения с подвижной посадкой (кулиса)
4) подвижные неразъёмные – подшипники качения, втулочно-роликовые клёпаные цепи, запорные краны

К сборочным процессам относятся также балансировка собранных узлов.

При выполнении сборочных работ возможны ошибки во взаимном расположении деталей и узлов, их повышенные деформации, несоблюдение в сопряжениях необходимых зазоров.

Погрешности сборки вызываются рядом причин:
– отклонением размеров и формы сопрягаемых деталей
– несоблюдением требований к качеству поверхностей деталей
– неточной установкой и фиксацией элементов машины в процессе её сборки
– несоблюдением режима сборочной операции, например, при затяжке винтовых соединений или склеивании
– геометрическими неточностями сборочного оборудования и технологической оснастки

Для достижения заданной точности сборки используют методы взаимозаменяемости, регулирования и пригонки.

В методе взаимозаменяемости предъявляются высокие требования к точности изготовляемых деталей, в результате чего сборка сводится лишь к соединению сопрягаемых деталей, что является преимуществом. Кроме того, унификация деталей позволяет использовать продукцию различных предприятий. Недостаток – высокая сложность и трудоёмкость изготовления деталей.

Сборка методом регулирования заключается в том, что точность сборки достигается путём изменения размера заранее выбранного компенсирующего звена. Компенсирующее кольцо подбирается сборщиком по результатам измерения фактического размера замыкающего звена. Недостаток – большая длительность сборки. Преимущество – универсальность (метод применим к любым деталям, требования к точности их изготовления низкие); простота сборки при высокой её точности; возможность регулирования соединения в процессе работы.

Сборка методом пригонки заключается в достижении заданной точности сопряжения путём снятия с одной из сопрягаемых деталей необходимого слоя материала опиловкой или любым другим способом. Метод трудоёмкий и применяется в единичном и мелкосерийном производствах.`,
        content_en: `The assembly process accounts for 20...50% of the total labor intensity of machine manufacturing. Assembly is divided into unit and general. The object of unit assembly is the assembly elements of the machine, the object of general assembly is the machine itself. Parts arrive at assembly after their final technical control.

The assembly process consists of two main parts: preparation of parts for assembly and the actual assembly operations. Preparatory work includes: various fitting and adjustment work performed as necessary; painting of individual parts; cleaning and washing of parts; lubrication of mating parts, if required by technical conditions.

The actual assembly work includes the process of connecting mating parts and units with ensuring their correct mutual position and a certain fit.

The following types of connections are distinguished:
1) fixed detachable - which can be disassembled without damaging the connected and fastened parts (for example, threaded)
2) fixed non-detachable - disconnection of which is associated with damage or complete destruction of parts (such connections are obtained by interference fit, flaring, welding, soldering, riveting, gluing)
3) movable detachable - connections with movable fit (slider)
4) movable non-detachable - rolling bearings, sleeve-roller riveted chains, shut-off valves

Assembly processes also include balancing of assembled units.

When performing assembly work, errors in the mutual arrangement of parts and units, their increased deformations, and non-compliance with necessary clearances in joints are possible.

Assembly errors are caused by a number of reasons:
- deviation of dimensions and shape of mating parts
- non-compliance with requirements for the quality of part surfaces
- inaccurate installation and fixation of machine elements during its assembly
- non-compliance with the assembly operation mode, for example, when tightening threaded connections or gluing
- geometric inaccuracies of assembly equipment and technological tooling

To achieve the specified assembly accuracy, methods of interchangeability, adjustment and fitting are used.

In the interchangeability method, high requirements are imposed on the accuracy of manufactured parts, as a result of which assembly is reduced only to connecting mating parts, which is an advantage. In addition, part unification allows using products from various enterprises. Disadvantage - high complexity and labor intensity of part manufacturing.

Assembly by the adjustment method consists in the fact that assembly accuracy is achieved by changing the size of a pre-selected compensating link. The compensating ring is selected by the assembler based on the results of measuring the actual size of the closing link. Disadvantage - long assembly duration. Advantage - versatility (the method is applicable to any parts, requirements for their manufacturing accuracy are low); simplicity of assembly with high accuracy; possibility of adjusting the connection during operation.

Assembly by the fitting method consists in achieving the specified joint accuracy by removing the necessary layer of material from one of the mating parts by filing or any other method. The method is labor-intensive and is used in single and small-scale production.`
      },
      {
        id: 'tech-4',
        title: '3.3. БАЗИРОВАНИЕ И БАЗЫ В МАШИНОСТРОЕНИИ',
        title_en: '3.3. LOCATING AND DATUMS IN MECHANICAL ENGINEERING',
        content: `Базирование – придание заготовке или изделию требуемого положения относительно выбранной системы координат.

База – поверхность или сочетание поверхностей, ось, точка, принадлежащая заготовке или изделию, и используемая для базирования.

Для обеспечения неподвижности заготовки или изделия в избранной системе координат на них необходимо наложить шесть двусторонних геометрических связей, для создания которых необходим комплект баз.

Базирование заготовки в приспособлении производится двумя или тремя базами. Среди них выделяется основная база. Заготовка, устанавливаемая этой базой в приспособление, получает почти полную ориентацию; для полной ориентации используются другие, вспомогательные базы.

Поверхности, используемые в качестве основной базы: плоская, цилиндрическое отверстие, цилиндрическая наружная поверхность.`,
        content_en: `Locating is giving a blank or product the required position relative to the selected coordinate system.

A datum is a surface or combination of surfaces, axis, point belonging to a blank or product and used for locating.

To ensure the immobility of a blank or product in the selected coordinate system, six bilateral geometric constraints must be imposed on them, for the creation of which a set of datums is necessary.

Locating a blank in a fixture is performed by two or three datums. Among them, the main datum is distinguished. A blank installed by this datum in the fixture receives almost complete orientation; for complete orientation, other, auxiliary datums are used.

Surfaces used as the main datum: flat, cylindrical hole, cylindrical outer surface.`
      },
      {
        id: 'tech-5',
        title: '3.4. ОСНОВНОЕ ОБОРУДОВАНИЕ МАШИНОСТРОИТЕЛЬНЫХ ПРОИЗВОДСТВ',
        title_en: '3.4. MAIN EQUIPMENT OF MECHANICAL ENGINEERING PRODUCTION',
        content: `Металлорежущие станки

В зависимости от целевого назначения станка для обработки тех или иных деталей или их поверхностей, выполнения соответствующих технологических операций и режущего инструмента, станки разделяют на следующие основные группы: токарные, сверлильные и расточные, фрезерные, шлифовальные. Условная классификация станков по технологическому признаку следующая:

Токарные (группа 1) разделяются на типы: специализированные, одношпиндельные, многошпиндельные, револьверные, сверлильно-отрезные, карусельные, токарные и лобовые, многорезцовые.

Сверлильные и расточные (группа 2): вертикально-сверлильные, одношпиндельные, многошпиндельные полуавтоматы, координатно-расточные, радиально-сверлильные, расточные, алмазно-расточные, горизонтально-сверлильные и центровые.

Шлифовальные, полировальные, доводочные, заточные (группа 3): круглошлифовальные, внутришлифовальные, обдирочно-шлифовальные, специализированные шлифовальные, заточные, плоскошлифовальные, притирочные и полировальные.

Фрезерные (группа 6): вертикально-фрезерные консольные, фрезерные непрерывного действия, копировальные и гравировальные, вертикальные бесконсольные, продольные, широкоуниверсальные, горизонтально-фрезерные консольные.

В последние годы получили распространение станки, на которых выполняются различные операции в результате автоматической смены режущих инструментов. Подобные станки получили название многооперационных станков или обрабатывающих центров. В обозначении конкретных моделей станков первая цифра указывает на группу станка (например, токарные 1), а вторая – на тип (например, токарно-карусельные станки имеют в обозначении цифру 15), а последние цифры характеризуют размер рабочего пространства, т.е. предельно допустимые размеры обработки.

Универсальные станки, иначе называемые станками общего назначения, предназначены для изготовления деталей широкой номенклатуры, обрабатываемых небольшими партиями в условиях мелкосерийного и серийного производства. Универсальные станки с ручным управлением требуют от оператора подготовки и частичной или полной реализации программы, а также выполнения функции манипулирования (смена заготовки и инструмента), контроль и измерение.

Специальные станки используют для производительной обработки одной или нескольких почти одинаковых деталей в условиях крупносерийного и особенно массового производства. Специальные станки, как правило, имеют высокую степень автоматизации.

Специализированные станки предназначены для обработки заготовок сравнительно узкой номенклатуры. Примером могут служить токарные станки для обработки коленчатых валов или шлифовальные станки для обработки колец шарикоподшипников. Специализированные станки имеют высокую степень автоматизации, и их используют в крупносерийном производстве при больших партиях, требующих редкой переналадки.

Автоматическую линию образуют из набора станков-автоматов, расположенных последовательно в соответствии с ходом технологического процесса и связанных общим транспортом и общим управлением. Переналаживаемая автоматическая линия может в режиме автоматической переналадки переходить от обработки одной детали к обработке другой похожей на неё детали. Общее число разных деталей при этом ограничено.

Станки наиболее распространённых технологических групп образуют размерные ряды, в которых за каждым станком закреплён вполне определённый диапазон размеров обрабатываемых деталей. Например, в группе токарных станков возможности станка характеризуются цилиндрическим рабочим пространством, а для многооперационных станков – прямоугольным рабочим пространством. По основному размеру рабочего пространства, максимальному диаметру для токарных станков, ширине стола для фрезерных и многооперационных станков устанавливают ряд стандартных значений, обычно в геометрической прогрессии с некоторым знаменателем R. Так, для станков токарной группы принят R = 1,25 и стандартный ряд наибольших диаметров обработки: 250, 320, 400, 630, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000 мм.

В зависимости от массы станка, которая связана с размерами обрабатываемых деталей и его типом, принято разделять станки на легкие (до 1 т), средние (1… 10 т), и тяжёлые (более 10 т). Особо тяжёлые станки с массой более 10 т называют уникальными. Станки также условно разделяют на классы точности: нормальной, повышенной, высокой, особо высокой и особо точные станки. Класс точности обозначают соответственно буквами Н, П, В, А, С.

Набор оборудования, используемого в машиностроительных производствах, не исчерпывается станками. При изготовлении изделий применяются различные виды подъёмных устройств (краны, лебедки и т.д.), прессы, штампы, механические ножницы и другое оборудование. В ряде случаев оборудование объединяют в технологические линии (роторные, конвейерные, гибкие) для повышения производительности труда. В этом случае дополнительно используются промышленные роботы и манипуляторы для перемещения деталей от одного рабочего места к другому. Для завершающей (финишной) обработки деталей используют оборудование для окрашивания, а также гальванические линии для нанесения защитных и декоративных покрытий.`,
        content_en: `Metal-cutting machines

Depending on the target purpose of the machine for processing certain parts or their surfaces, performing corresponding technological operations and cutting tools, machines are divided into the following main groups: lathes, drilling and boring, milling, grinding. The conditional classification of machines by technological feature is as follows:

Lathes (group 1) are divided into types: specialized, single-spindle, multi-spindle, turret, drilling-cutting, carousel, lathes and face, multi-cutter.

Drilling and boring (group 2): vertical drilling, single-spindle, multi-spindle semi-automatic, jig boring, radial drilling, boring, diamond boring, horizontal drilling and centering.

Grinding, polishing, finishing, sharpening (group 3): cylindrical grinding, internal grinding, rough grinding, specialized grinding, sharpening, surface grinding, lapping and polishing.

Milling (group 6): vertical milling console, continuous milling, copying and engraving, vertical non-console, longitudinal, wide universal, horizontal milling console.

In recent years, machines have become widespread on which various operations are performed as a result of automatic tool changes. Such machines are called multi-operation machines or machining centers. In the designation of specific machine models, the first digit indicates the machine group (for example, lathes 1), and the second - the type (for example, carousel lathes have the number 15 in the designation), and the last digits characterize the size of the working space, i.e. the maximum allowable processing dimensions.

Universal machines, otherwise called general-purpose machines, are designed for manufacturing parts of a wide range, processed in small batches in conditions of small-scale and serial production. Universal machines with manual control require the operator to prepare and partially or fully implement the program, as well as perform the manipulation function (changing the blank and tool), control and measurement.

Special machines are used for productive processing of one or several almost identical parts in conditions of large-scale and especially mass production. Special machines, as a rule, have a high degree of automation.

Specialized machines are designed for processing blanks of a relatively narrow range. Examples include lathes for processing crankshafts or grinding machines for processing ball bearing rings. Specialized machines have a high degree of automation and are used in large-scale production with large batches requiring rare retooling.

An automatic line is formed from a set of automatic machines arranged sequentially in accordance with the course of the technological process and connected by common transport and common control. A retoolable automatic line can, in automatic retooling mode, switch from processing one part to processing another part similar to it. The total number of different parts is limited.

Machines of the most common technological groups form dimensional series, in which each machine is assigned a quite definite range of sizes of processed parts. For example, in the group of lathes, the machine's capabilities are characterized by a cylindrical working space, and for multi-operation machines - by a rectangular working space. According to the main size of the working space, the maximum diameter for lathes, the table width for milling and multi-operation machines, a series of standard values is established, usually in geometric progression with some denominator R. So, for machines of the lathe group, R = 1.25 is adopted and a standard series of the largest processing diameters: 250, 320, 400, 630, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000 mm.

Depending on the machine mass, which is related to the dimensions of processed parts and its type, it is customary to divide machines into light (up to 1 t), medium (1...10 t), and heavy (more than 10 t). Particularly heavy machines with a mass of more than 10 t are called unique. Machines are also conditionally divided into accuracy classes: normal, increased, high, especially high and especially precise machines. The accuracy class is designated by the letters H, P, V, A, C, respectively.

The set of equipment used in mechanical engineering production is not limited to machines. In the manufacture of products, various types of lifting devices (cranes, winches, etc.), presses, dies, mechanical shears and other equipment are used. In some cases, equipment is combined into technological lines (rotary, conveyor, flexible) to increase labor productivity. In this case, industrial robots and manipulators are additionally used to move parts from one workplace to another. For finishing (final) processing of parts, painting equipment is used, as well as galvanic lines for applying protective and decorative coatings.`
      },
      {
        id: 'tech-6',
        title: '3.5. СТАНКИ С ЧИСЛОВЫМ ПРОГРАММНЫМ УПРАВЛЕНИЕМ',
        title_en: '3.5. NUMERICALLY CONTROLLED MACHINES',
        content: `Станки с числовым программным управлением (ЧПУ) представляют собой сложные многоинструментные станки, в которых управляется по программе:
- порядок выбора инструмента
- выбор величины подач инструмента для достижения правильной формы и требуемой точности размеров изготавливаемой детали
- количество оборотов инструмента и т.д.

В зависимости от вида обработки станки оснащаются различными устройствами управления:
1) позиционные – для управления перемещением исполнительных механизмов станка от точки к точке без задания траектории
2) непрерывные или контурные – для управления всеми траекториями перемещения исполнительных механизмов станка при обработке деталей сложных профилей
3) универсальные или комбинированные – как для контурной, так и для позиционной обработки

Станки с ЧПУ позволяют существенно повысить производительность и точность обработки, сократить время на переналадку оборудования.`,
        content_en: `Numerically controlled (CNC) machines are complex multi-tool machines in which the following are controlled by program:
- tool selection order
- selection of tool feed values to achieve the correct shape and required accuracy of dimensions of the manufactured part
- number of tool revolutions, etc.

Depending on the type of processing, machines are equipped with various control devices:
1) positional - for controlling the movement of machine actuators from point to point without specifying a trajectory
2) continuous or contour - for controlling all trajectories of movement of machine actuators when processing parts of complex profiles
3) universal or combined - for both contour and positional processing

CNC machines allow to significantly increase productivity and processing accuracy, reduce equipment retooling time.`
      },
      {
        id: 'tech-7',
        title: '3.6. РАЗРАБОТКА ТЕХНОЛОГИЧЕСКИХ ПРОЦЕССОВ',
        title_en: '3.6. DEVELOPMENT OF TECHNOLOGICAL PROCESSES',
        content: `Различают три вида технологических процессов: единичный, типовой, групповой. Каждый ТП разрабатывается при подготовке производства изделий, конструкции которых отработаны на технологичность.

Групповой технологический процесс предназначен для совместного изготовления группы изделий различной конфигурации в конкретных условиях производства на специализированных рабочих местах. Групповой технологический процесс разрабатывается с целью экономически целесообразного применения методов и средств крупносерийного и массового производства в условиях единичного, мелкосерийного и серийного производств.

Типовой технологический процесс характеризуется единством содержания и последовательности большинства технологических операций для группы изделий, обладающих общими конструктивными признаками. Типизация технологических процессов основана на разделении деталей и изделий на отдельные группы, для которых возможна разработка общих технологических процессов или операций.

ТП разрабатывается для изготовления нового изделия или совершенствования выпускаемого. Основой для нового ТП обычно служит имеющийся типовой или групповой ТП. Если таковые отсутствуют, то за основу берут действующие единичные ТП изготовления аналогичных изделий. ТП должен соответствовать требованиям техники безопасности и промышленной санитарии по системе стандартов безопасности труда, инструкций и других нормативных документов.

Исходную информацию для разработки ТП подразделяют на базовую, руководящую и справочную.

Базовая информация включает данные, содержащиеся в конструкторской документации на изделие, и программу его выпуска.

Руководящая информация содержит:
– требования отраслевых стандартов к ТП и методам управления ими
– стандарты на оборудование и оснастку
– документацию на действующие единичные, типовые и групповые ТП
– классификаторы технико-экономической информации
– производственные инструкции
– материалы по выбору технологических нормативов (режимов обработки, норм расхода материалов и др.)
– документацию по технике безопасности и промышленной санитарии

Справочная информация:
– технологическая документация опытного производства
– описания прогрессивных методов изготовления
– каталоги, паспорта, справочники, альбомы прогрессивных средств технологического оснащения

Исходные данные для проектирования технологических процессов сборки:
– сборочные чертежи изделия
– спецификация входящих в узлы деталей
– размер производственного задания и срок его выполнения
– условия выполнения сборочных работ

Степень углублённости проектирования технологического процесса зависит от масштаба выпуска изделий: в единичном и мелкосерийном производствах разрабатывают упрощенный вариант без детализации содержания операций. При массовом производстве изделий технологический процесс разрабатывают детально с проектированием операционной технологии.

Основные этапы разработки технологического процесса механообработки методом нового планирования следующие:

1. Анализ исходных данных. По имеющимся сведениям о программе выпуска и конструкторской документации на изделие изучаются назначение и конструкция изделия, требования к его изготовлению и эксплуатации.

2. Выбор заготовки. По классификатору заготовок, методике расчёта и технико-экономической оценке выбора заготовок, стандартам и техническим условиям на заготовку и основной материал выбирают исходную заготовку и методы её изготовления. Даётся технико-экономическое обоснование выбора заготовки.

3. Выбор технологических баз. Производится оценка точности и надежности базирования. Используют классификаторы способов базирования и существующую методику выбора технологических баз.

4. Составление технологического маршрута обработки (по документации типового, группового или единичного ТП); определяют последовательность технологических операций и состав технологического оснащения.

5. Разработка составов технологических операций и расчёт режимов обработки. На основании документации (типовых, групповых или единичных технологических операций) и классификатора технологических операций составляют последовательность переходов в каждой операции.

6. Выбор основного оборудования. Здесь используются спецификации оборудования, данные о параметрах обработки. В соответствии с заданными критериями, определяется оборудование, на котором должен быть выполнен конкретный технологический переход. При выборе станка производится дополнительная проверка технических и экономических условий использования. В качестве технических критериев могут использоваться: параметры рабочей зоны станка, которые определяют максимально возможную массу детали (или размеры); требуемое качество обработки.

7. Выбор вспомогательных средств. Используются каталоги с данными по инструменту, приспособлениям, средствам контроля. Инструменты, приспособления, зажимные устройства характеризуются как вспомогательное оборудование, так как они определяются основным оборудованием в соответствии с параметрами обрабатывающей позиции. В технологическом маршруте должны постоянно присутствовать данные о необходимых вспомогательных средствах для реализации каждого технологического перехода.

8. Составление программ для станков с ЧПУ.

9. Нормирование ТП. Устанавливаются исходные данные расчёта норм времени и расхода материалов; производится расчёт и нормирование труда на выполнение процесса, расчёт норм расхода материалов; определяется разряд работ и профессии исполнителей операций (используют нормативы времени и расхода материалов, классификаторы разрядов работ и профессий).

10. Обеспечение требований техники безопасности и производственной санитарии. Используются стандарты системы безопасности труда, инструкции.

11. Выбор оптимального ТП из нескольких вариантов по методике расчёта экономической эффективности. При разработке ТП ручными методами количество вариантов не велико. Использование автоматизированных методов позволяет получить более рациональные решения.

12. Оформление технологической документации.

Конечным результатом технологической подготовки производства является получение технологической документации, необходимой для осуществления производственной деятельности. К такой документации относятся маршрутные карты, операционные карты и другие документы, правила оформления которых регламентируются системой ГОСТов ЕСТД.

Основным технологическим документом является маршрутная карта (МК). Формы и правила оформления маршрутных карт установлены ГОСТ 3.1118–82. Они являются унифицированными, и их следует применять независимо от типа и характера производства и степени детализации описания технологических процессов. Для изложения технологических процессов в МК используют способ заполнения, при котором информацию вносят построчно несколькими типами строк. Каждому типу строки соответствует свой служебный символ. В качестве обозначения служебных символов приняты буквы русского алфавита, проставляемые перед номером соответствующей строки, например, М01, А12 и т.д.`,
        content_en: `There are three types of technological processes: single, typical, group. Each TP is developed during production preparation of products whose designs are worked out for manufacturability.

A group technological process is intended for joint manufacturing of a group of products of various configurations in specific production conditions at specialized workplaces. A group technological process is developed with the aim of economically expedient application of methods and means of large-scale and mass production in conditions of single, small-scale and serial production.

A typical technological process is characterized by the unity of content and sequence of most technological operations for a group of products with common design features. Typification of technological processes is based on dividing parts and products into separate groups, for which it is possible to develop common technological processes or operations.

TP is developed for manufacturing a new product or improving a manufactured one. The basis for a new TP is usually an existing typical or group TP. If such are absent, then existing single TPs for manufacturing similar products are taken as the basis. TP must comply with safety and industrial sanitation requirements according to the system of labor safety standards, instructions and other regulatory documents.

Initial information for TP development is divided into basic, guiding and reference.

Basic information includes data contained in design documentation for the product and its production program.

Guiding information contains:
- requirements of industry standards for TP and methods of their management
- standards for equipment and tooling
- documentation on existing single, typical and group TPs
- classifiers of technical and economic information
- production instructions
- materials on selection of technological standards (processing modes, material consumption rates, etc.)
- documentation on safety and industrial sanitation

Reference information:
- technological documentation of pilot production
- descriptions of progressive manufacturing methods
- catalogs, passports, reference books, albums of progressive means of technological equipment

Initial data for designing assembly technological processes:
- assembly drawings of the product
- specification of parts included in units
- size of production task and its execution deadline
- conditions for performing assembly work

The depth of technological process design depends on the scale of product production: in single and small-scale production, a simplified version is developed without detailing the content of operations. In mass production of products, the technological process is developed in detail with design of operational technology.

The main stages of developing a mechanical processing technological process by the new planning method are as follows:

1. Analysis of initial data. Based on available information about the production program and design documentation for the product, the purpose and design of the product, requirements for its manufacturing and operation are studied.

2. Selection of blank. According to the blank classifier, calculation methodology and technical and economic assessment of blank selection, standards and technical conditions for the blank and main material, the initial blank and methods of its manufacturing are selected. Technical and economic justification of blank selection is given.

3. Selection of technological datums. Assessment of accuracy and reliability of locating is performed. Classifiers of locating methods and existing methodology for selecting technological datums are used.

4. Compilation of processing technological route (according to documentation of typical, group or single TP); sequence of technological operations and composition of technological equipment are determined.

5. Development of technological operation compositions and calculation of processing modes. Based on documentation (typical, group or single technological operations) and technological operation classifier, sequence of transitions in each operation is compiled.

6. Selection of main equipment. Here, equipment specifications, data on processing parameters are used. According to given criteria, equipment on which a specific technological transition should be performed is determined. When selecting a machine, additional verification of technical and economic conditions of use is performed. As technical criteria, the following can be used: parameters of the machine working zone, which determine the maximum possible part mass (or dimensions); required processing quality.

7. Selection of auxiliary means. Catalogs with data on tools, fixtures, control means are used. Tools, fixtures, clamping devices are characterized as auxiliary equipment, as they are determined by the main equipment according to processing position parameters. In the technological route, data on necessary auxiliary means for implementing each technological transition must constantly be present.

8. Compilation of programs for CNC machines.

9. TP standardization. Initial data for calculating time and material consumption norms are established; calculation and standardization of labor for process execution, calculation of material consumption norms are performed; work grade and profession of operation performers are determined (time and material consumption standards, classifiers of work grades and professions are used).

10. Ensuring safety and industrial sanitation requirements. Labor safety system standards, instructions are used.

11. Selection of optimal TP from several variants according to economic efficiency calculation methodology. When developing TP by manual methods, the number of variants is not large. Use of automated methods allows obtaining more rational solutions.

12. Formatting of technological documentation.

The final result of technological production preparation is obtaining technological documentation necessary for production activities. Such documentation includes route cards, operation cards and other documents, the formatting rules of which are regulated by the GOST ESTD system.

The main technological document is the route card (RC). Forms and formatting rules of route cards are established by GOST 3.1118-82. They are unified and should be applied regardless of the type and nature of production and the degree of detailing of technological process descriptions. For presenting technological processes in RC, a filling method is used in which information is entered line by line with several types of lines. Each line type corresponds to its service symbol. As designations of service symbols, letters of the Russian alphabet are accepted, placed before the number of the corresponding line, for example, M01, A12, etc.`
      },
      {
        id: 'tech-8',
        title: '3.7. МЕТОДЫ РЕАЛИЗАЦИИ ТЕХНОЛОГИЧЕСКОЙ ПОДГОТОВКИ ПРОИЗВОДСТВА',
        title_en: '3.7. METHODS OF IMPLEMENTING TECHNOLOGICAL PRODUCTION PREPARATION',
        content: `В настоящее время на машиностроительных предприятиях используют следующие методы реализации ТПП: управление технологической подготовкой производства, вариантного, адаптивного и нового планирования. Следует отметить, что границы методов весьма условны. Возможно сочетание отдельных элементов различных методов.

Выбор метода для конкретной задачи зависит от условий производства, способов изготовления, назначения изделий, а также от субъективных факторов.

Управление технологической подготовкой производства

Метод управления ТПП заключается в организации хранения информации по технологическим маршрутам в соответствии с определённой системой классификации и кодирования и выбора нужной информации в соответствии с требованием заказа. Этот метод применяется в качестве повторного планирования. Его область применения является ограниченной, так как повторяемость обрабатываемых деталей, как правило, невелика.

Характерным для данного метода – наиболее простого и поэтому первого, для которого были разработаны АСТПП, является хранение информации в соответствии с определённой системой классификации и кодирования и выдача этой информации в удобной для пользователя форме. Основой этого служит наличие множества технологических карт на обрабатываемые детали и определение требований по выполнению заказа.

Код карты отражает различные аспекты классификации: вид заготовки, методы обработки и т.д. Кроме того, система классификации предназначена для организации доступа информации, цель которой состоит в минимизации затрат на поиск. По виду поиска метод управления использует метод поиска по имени объекта.

Вариантное планирование

Исходной предпосылкой данного метода является разбиение инженерами-технологами деталей на классы. В каждый класс входят детали, изготавливающиеся по аналогичной технологии. В каждом классе выделяются детали-представители, которые являются обобщенными представителями, включающими все специфические особенности каждой детали. Для такой детали-представителя разрабатывается стандартный технологический маршрут. Для каждой конкретной детали данного класса выбирается вариант стандартного маршрута, являющегося его подмножеством. Вариантное планирование предусматривает возможность уточнения стандартного маршрута путём изменения параметров процесса в определенных границах. Увеличение числа обрабатываемых элементов не допускается.

При использовании метода вариантного планирования определённый класс деталей представлен стандартной технологической картой, которая отражает полный технологический процесс для всех вариантов класса деталей. Функциями этого метода ТПП являются ввод и хранение стандартных технологических карт, их поиск, расчёт переменных параметров процесса, выдача карт.

На этапе поиска в базе данных стандартной технологической карты, так же, как и в методе управления, используется метод поиска по имени объекта.

Адаптивное планирование

Первым этапом данного метода является построение некоторого множества технологических маршрутов инженерами-технологами. На этапе технологического проектирования осуществляется поиск наиболее близкого к заданному технологического маршрута из имеющихся с помощью определённого классификатора. Далее выбранный технологический маршрут адаптируется к конкретным требованиям заказчика путём добавления, удаления, изменения отдельных шагов проектирования.

Адаптивное планирование в противоположность методам управления и вариантного планирования обеспечивает порождение дополнительных технологических данных.

Основные функции метода: ввод и хранение технологических карт, поиск карты-аналога, модификация процесса обработки, проведение дополнительных расчётов.

Поиск аналога может осуществляться методом поиска по имени объекта; ассоциативным поиском – по известным свойствам объекта (геометрические размеры, форма и т.д.) или смешанным поиском – по имени и известным свойствам.

Метод нового планирования

Позволяет вести разработку технологических маршрутов для подобных и новых деталей в соответствии с общими и специфическими данными и правилами технологического проектирования. Основой этого служат описания деталей и требования, предъявляемые к её обработке. Анализ этих требований позволяет выявить возможные пути решения технологических задач и в соответствии с определёнными критериями выбрать метод решения. Таким образом, этот метод является и генерирующим, и оптимизирующим; наиболее ценен в связи с этим и наиболее сложен для автоматизации.

Автоматизация этого метода наиболее трудоёмка, т.к. при его использовании осуществляется проектирование и документирование ТП на основе введённых данных. По исходным данным (описанию детали и программе выпуска) осуществляется выбор заготовки, построение технологического маршрута, выбор оборудования, осуществляются временные расчёты.

Рассмотрим отдельные задачи метода нового планирования.

Выбор вида заготовки и методов её изготовления. Виды заготовок: отливки; прокат; поковки; штамповки; сварные заготовки. В качестве критериев оптимизации выбора заготовок используют: себестоимость изготовления заготовки Сз → min; себестоимость механической обработки заготовки для получения детали См → min; стоимость отходов металла Со → min.

Алгоритм выбора оптимального метода получения заготовки состоит из следующих шагов:
1. Выбор возможных видов заготовки по материалу детали. В зависимости от вида материала (сталь, чугун, сплавы и т.д.) выбираются методы получения заготовок – отливки, штамповки, прокат, поковки.
2. Выбор возможных методов изготовления заготовок исходя из серийности детали (единичная, серийная, крупносерийная, массовая); конструктивной формы детали (цилиндрическая, дисковая, пространственная, корпусная и т.д.); массы и размеров детали.
3. Определение технических характеристик для выбранных видов заготовок (точность, коэффициент использования материала и др.).
4. Определение себестоимости изготовления заготовки.
5. Определение себестоимости механической обработки заготовки.
6. Определение стоимости отходов материала.
7. Выбор оптимального метода изготовления заготовки для конкретных условий производства.

Выбор технологических баз. Алгоритм выбора технологических баз заключается в следующем. После ввода конфигурации детали осуществляется автоматический расчёт площадей всех поверхностей детали и их ранжирование в порядке убывания. В качестве основной базы пользователю предлагается поверхность с наибольшей площадью. Если пользователя устраивает данный вариант, то осуществляется переход к выбору вспомогательных баз, если нет – пользователю предлагается следующая по размеру площади поверхность. Выбор вспомогательных баз осуществляется аналогично из поверхностей, оставшихся после выбора основной базы.

Проектирование технологического маршрута. Данная задача – главная и наиболее трудная. В методе нового планирования используют различные диалоговые подсистемы формирования технологического маршрута. Исходная информация о детали: общие сведения; сведения о заготовке (поступают из подсистемы выбора заготовки); описание наружных и внутренних поверхностей; допустимые отклонения.

Вся исходная информация кодируется. База данных подсистемы – наборы последовательностей технологических операций; значения параметров для расчёта режимов резания и времени обработки. В диалоговом режиме осуществляется подбор технологических операций, расчёт и оптимизация режимов резания, расчёт затрат времени на изготовление детали, расчёт какого-либо критерия оптимальности (например, себестоимости изготовления детали), оптимизация технологического маршрута по выбранному критерию.

Проектирование технологических операций. Каждая технологическая операция, выбранная на этапе проектирования технологического маршрута, проектируется в виде последовательности переходов. Одну и ту же операцию возможно реализовать различной последовательностью отличающихся переходов. Выбор наилучшего варианта осуществляется по критериям: себестоимость операции, время выполнения операции и другим.

Выбор основного оборудования. Оборудование для выполнения операций выбирается в зависимости от намеченного состава операций, габаритов и конфигурации детали, требуемой точности обработки, программы выпуска деталей. Состав операции (т.е. перечень поверхностей, обрабатываемых на операции) зависит от возможностей оборудования, и наоборот, оборудование выбирается в зависимости от состава операции, поэтому эти задачи решаются параллельно. База данных о станках содержит следующую информацию: код оборудования в соответствии с классификатором; мощность станка; максимальные размеры сечения резцов, которые можно установить в резцедержателе (для токарного станка); максимальное количество инструментов, которые можно одновременно установить на станке; числа оборотов и др. Выбор оборудования обычно оптимизируется по критерию стоимости.

Выбор инструмента. Выбор режущего инструмента осуществляется для каждого технологического перехода. Исходные данные: геометрия детали; сведения о заготовке; технологические характеристики применяемого оборудования.

Инструмент выбирается из справочной базы, охватывающей все его разновидности. Последовательность выбора инструмента следующая:
– по коду технологического перехода определяется код группы инструмента
– по модели станка выбирается код подгруппы инструмента
– уточняются размеры и другие характеристики инструмента по размерам и форме удаляемого металла, чистоте обработки, материалу заготовки и т.д.
– ищется нужный инструмент в базе данных (по сформированным размерам и другим характеристикам).`,
        content_en: `Currently, mechanical engineering enterprises use the following methods of implementing TPP: management of technological production preparation, variant, adaptive and new planning. It should be noted that the boundaries of methods are very conditional. Combination of individual elements of various methods is possible.

The choice of method for a specific task depends on production conditions, manufacturing methods, product purpose, as well as subjective factors.

Management of technological production preparation

The TPP management method consists in organizing storage of information on technological routes according to a certain classification and coding system and selecting the necessary information according to order requirements. This method is used as repeated planning. Its scope is limited, as the repeatability of processed parts is usually not high.

Characteristic of this method - the simplest and therefore the first, for which ASTPP were developed, is storing information according to a certain classification and coding system and issuing this information in a form convenient for the user. The basis for this is the presence of many technological cards for processed parts and determination of requirements for order execution.

The card code reflects various aspects of classification: type of blank, processing methods, etc. In addition, the classification system is intended for organizing information access, the goal of which is to minimize search costs. By type of search, the management method uses the object name search method.

Variant planning

The initial premise of this method is the division of parts into classes by process engineers. Each class includes parts manufactured according to similar technology. In each class, representative parts are distinguished, which are generalized representatives including all specific features of each part. For such a representative part, a standard technological route is developed. For each specific part of this class, a variant of the standard route, which is its subset, is selected. Variant planning provides for the possibility of refining the standard route by changing process parameters within certain limits. Increasing the number of processed elements is not allowed.

When using the variant planning method, a certain class of parts is represented by a standard technological card, which reflects the complete technological process for all variants of the part class. Functions of this TPP method are input and storage of standard technological cards, their search, calculation of variable process parameters, card issuance.

At the search stage in the database of a standard technological card, as well as in the management method, the object name search method is used.

Adaptive planning

The first stage of this method is the construction of a certain set of technological routes by process engineers. At the technological design stage, a search for the technological route closest to the given one from available ones is carried out using a certain classifier. Then the selected technological route is adapted to specific customer requirements by adding, removing, changing individual design steps.

Adaptive planning, in contrast to management and variant planning methods, ensures generation of additional technological data.

Main functions of the method: input and storage of technological cards, search for an analog card, modification of the processing process, conducting additional calculations.

Analog search can be carried out by the object name search method; associative search - by known object properties (geometric dimensions, shape, etc.) or mixed search - by name and known properties.

New planning method

Allows conducting development of technological routes for similar and new parts according to general and specific data and technological design rules. The basis for this is part descriptions and requirements for its processing. Analysis of these requirements allows identifying possible ways of solving technological tasks and selecting a solution method according to certain criteria. Thus, this method is both generating and optimizing; most valuable in this regard and most complex for automation.

Automation of this method is most labor-intensive, as when using it, TP design and documentation are carried out based on entered data. According to initial data (part description and production program), blank selection, technological route construction, equipment selection, time calculations are carried out.

Let us consider individual tasks of the new planning method.

Selection of blank type and methods of its manufacturing. Types of blanks: castings; rolled products; forgings; stampings; welded blanks. As optimization criteria for blank selection, the following are used: blank manufacturing cost Сз → min; mechanical processing cost of blank to obtain part См → min; metal waste cost Со → min.

The algorithm for selecting the optimal method of obtaining a blank consists of the following steps:
1. Selection of possible blank types by part material. Depending on material type (steel, cast iron, alloys, etc.), methods of obtaining blanks are selected - castings, stampings, rolled products, forgings.
2. Selection of possible blank manufacturing methods based on part batch size (single, serial, large-scale, mass); part design form (cylindrical, disk, spatial, body, etc.); part mass and dimensions.
3. Determination of technical characteristics for selected blank types (accuracy, material utilization coefficient, etc.).
4. Determination of blank manufacturing cost.
5. Determination of mechanical processing cost of blank.
6. Determination of material waste cost.
7. Selection of optimal blank manufacturing method for specific production conditions.

Selection of technological datums. The algorithm for selecting technological datums is as follows. After entering part configuration, automatic calculation of areas of all part surfaces and their ranking in descending order is carried out. As the main datum, the user is offered the surface with the largest area. If the user is satisfied with this option, then transition to selection of auxiliary datums is carried out, if not - the user is offered the next surface by area size. Selection of auxiliary datums is carried out similarly from surfaces remaining after main datum selection.

Technological route design. This task is the main and most difficult. In the new planning method, various dialog subsystems for forming technological routes are used. Initial information about the part: general information; information about the blank (comes from the blank selection subsystem); description of outer and inner surfaces; allowable deviations.

All initial information is coded. The subsystem database is sets of sequences of technological operations; parameter values for calculating cutting modes and processing time. In dialog mode, selection of technological operations, calculation and optimization of cutting modes, calculation of time costs for part manufacturing, calculation of any optimality criterion (for example, part manufacturing cost), optimization of technological route according to selected criterion are carried out.

Technological operation design. Each technological operation selected at the technological route design stage is designed as a sequence of transitions. The same operation can be implemented by different sequences of different transitions. Selection of the best variant is carried out according to criteria: operation cost, operation execution time and others.

Selection of main equipment. Equipment for performing operations is selected depending on the planned composition of operations, part dimensions and configuration, required processing accuracy, part production program. Operation composition (i.e., list of surfaces processed at the operation) depends on equipment capabilities, and vice versa, equipment is selected depending on operation composition, so these tasks are solved in parallel. The database on machines contains the following information: equipment code according to classifier; machine power; maximum cross-section dimensions of cutters that can be installed in the tool holder (for lathe); maximum number of tools that can be simultaneously installed on the machine; numbers of revolutions, etc. Equipment selection is usually optimized according to cost criterion.

Tool selection. Cutting tool selection is carried out for each technological transition. Initial data: part geometry; information about the blank; technological characteristics of the equipment used.

The tool is selected from a reference database covering all its varieties. The sequence of tool selection is as follows:
- by technological transition code, the tool group code is determined
- by machine model, the tool subgroup code is selected
- tool dimensions and other characteristics are refined by dimensions and shape of removed metal, processing cleanliness, blank material, etc.
- the required tool is searched in the database (by formed dimensions and other characteristics).`
      },
      {
        id: 'tech-9',
        title: '3.8. АВТОМАТИЗАЦИЯ ТЕХНОЛОГИЧЕСКОЙ ПОДГОТОВКИ ПРОИЗВОДСТВА СТАНКОВ С ЧПУ',
        title_en: '3.8. AUTOMATION OF TECHNOLOGICAL PRODUCTION PREPARATION FOR CNC MACHINES',
        content: `Автоматизированные системы ТПП включают решение следующих задач, отсутствующих в ТПП обычных производств:

Автоматизация геометрических расчётов. Геометрические расчёты включают в себя снятие координат с чертежа и задание базовой и опорных точек. Базовая точка – такая, куда выводится инструмент перед началом и после завершения обработки. Опорная точка – в которой осуществляется изменение направления движения инструмента.

В общем случае при обработке конических или фасонных поверхностей высокой точности необходимо учитывать скругление при вершине резца. В этом случае программируют траекторию центра скругляющей дуги – эквидистанту.

По степени сложности геометрические расчёты могут быть классифицированы следующим образом.

Расчёт перемещений по контуру:
– прямолинейных плоских
– криволинейных плоских
– прямолинейных объёмных
– криволинейных объёмных

Расчёт перемещений по эквидистанте:
– прямолинейных плоских
– криволинейных плоских
– прямолинейных объёмных
– криволинейных объёмных

Программно осуществляются расчёты, особенно сложные для криволинейных поверхностей и расчётов перемещений по эквидистанте.

Автоматизация программирования. Для простых задач – например, для сверлильных станков с ЧПУ – вводится информация о координатах, диаметрах и глубинах отверстий, после чего программа формируется автоматически. Для более сложных задач программа формируется в диалоге с технологом. Далее осуществляется синтаксический анализ правильности программы – компьютер ищет и указывает ошибки, технолог – исправляет. Кодирование программы в коды требуемого станка осуществляется автоматически.

Графическое моделирование траектории движения инструмента для тестирования программ ЧПУ. Данная задача ТПП станков с ЧПУ может быть решена только с использованием вычислительной техники. Построение траектории движения инструмента и вывод её на экран дисплея или графопостроителя позволяет провести тестирование программы ЧПУ на этапе её разработки и значительно снизить время на наладку станка с ЧПУ.

При решении задач пространственной обработки для контроля получаемых программ ЧПУ на графопостроителе (или графическом дисплее), например, для определения глубины сверления, движения фрезы и т.д., необходимо построить и вычислить значения сечений в двух или трёх проекциях. Это требует много времени. Кроме того, при решении задачи одновременной обработки по нескольким направлениям часто бывает невозможно однозначно восстановить образ детали по чертежам её проекций, а значит, и невозможно проверить правильность программы ЧПУ. В этом случае используется изометрическое представление траектории движения инструмента. При этом моделируется возможность поворота деталей (имитация изменения точки наблюдателя) для возможности удостовериться в правильности полученной детали в случае её сложной формы, например дважды искривлённые фигуры – лопатки турбин и т.д.

Следующий этап – составление программ сопряжения поверхностей, обрабатываемых различным инструментом. Получение чертежей в этом случае также выполняется в изометрии и разным цветом. Для проверки правильности программ сверлений и внутренней обработки, разрабатываются программы получения сечений.

Автоматизация ТПП для станков с ЧПУ позволяет существенно сократить время подготовки производства и повысить точность изготовления деталей.`,
        content_en: `Automated TPP systems include solving the following tasks absent in TPP of conventional production:

Automation of geometric calculations. Geometric calculations include taking coordinates from the drawing and setting base and reference points. Base point is such where the tool is brought before the start and after completion of processing. Reference point is where change of tool movement direction is carried out.

In the general case, when processing conical or shaped surfaces of high accuracy, it is necessary to take into account rounding at the cutter tip. In this case, the trajectory of the center of the rounding arc - the equidistant - is programmed.

By degree of complexity, geometric calculations can be classified as follows.

Calculation of movements along contour:
- rectilinear flat
- curvilinear flat
- rectilinear volumetric
- curvilinear volumetric

Calculation of movements along equidistant:
- rectilinear flat
- curvilinear flat
- rectilinear volumetric
- curvilinear volumetric

Calculations are programmatically carried out, especially complex for curvilinear surfaces and calculations of movements along equidistant.

Automation of programming. For simple tasks - for example, for CNC drilling machines - information about coordinates, diameters and depths of holes is entered, after which the program is automatically formed. For more complex tasks, the program is formed in dialogue with the technologist. Then syntactic analysis of program correctness is carried out - the computer searches and indicates errors, the technologist - corrects. Program encoding into codes of the required machine is carried out automatically.

Graphical modeling of tool movement trajectory for testing CNC programs. This TPP task for CNC machines can only be solved using computer technology. Construction of tool movement trajectory and its output to the display screen or plotter allows testing the CNC program at its development stage and significantly reduces time for CNC machine setup.

When solving spatial processing tasks for controlling obtained CNC programs on a plotter (or graphic display), for example, for determining drilling depth, milling cutter movement, etc., it is necessary to construct and calculate section values in two or three projections. This requires much time. In addition, when solving the task of simultaneous processing in several directions, it is often impossible to unambiguously restore the part image from drawings of its projections, which means it is impossible to check the correctness of the CNC program. In this case, isometric representation of tool movement trajectory is used. At the same time, the possibility of rotating parts (simulation of observer point change) is modeled for the possibility of verifying the correctness of the obtained part in case of its complex shape, for example, doubly curved figures - turbine blades, etc.

The next stage is compilation of programs for mating surfaces processed by different tools. Obtaining drawings in this case is also performed in isometry and in different colors. For checking the correctness of drilling and internal processing programs, programs for obtaining sections are developed.

Automation of TPP for CNC machines allows to significantly reduce production preparation time and increase part manufacturing accuracy.`
      },
      {
        id: 'tech-10',
        title: '3.9. ТЕХНОЛОГИЧЕСКАЯ ПОДГОТОВКА ГИБКИХ ПРОИЗВОДСТВЕННЫХ СИСТЕМ',
        title_en: '3.9. TECHNOLOGICAL PREPARATION OF FLEXIBLE PRODUCTION SYSTEMS',
        content: `Гибкие производственные системы (ГПС) представляют собой комплекс технологического оборудования, промышленных роботов, транспортных систем, автоматических складов и системы управления, обеспечивающий производство различных изделий по различным технологиям.

Технологическая подготовка гибкого производства кроме традиционных задач включает планирование сменно-суточных заданий гибким производственным модулям, в которых указывается, в какое время, на каком оборудовании, по каким технологиям будут изготавливаться детали.

Ещё одной дополнительной задачей является выбор компоновочной схемы ГПС. Компоновочная схема включает комплекс технических средств, обеспечивающий проведение технологического процесса, их расположение, а также схему связей, которые определяют пути движения изделий и их составных частей в процессе производства.

ГПС позволяют быстро перестраиваться на выпуск новой продукции, обеспечивают высокую гибкость производства и эффективное использование оборудования.`,
        content_en: `Flexible production systems (FPS) are a complex of technological equipment, industrial robots, transport systems, automatic warehouses and control system, ensuring production of various products according to various technologies.

Technological preparation of flexible production, in addition to traditional tasks, includes planning of shift-daily tasks for flexible production modules, which indicate at what time, on what equipment, according to what technologies parts will be manufactured.

Another additional task is the selection of FPS layout scheme. The layout scheme includes a complex of technical means ensuring the technological process, their location, as well as a scheme of connections that determine the paths of movement of products and their components in the production process.

FPS allow quick restructuring for production of new products, ensure high production flexibility and efficient use of equipment.`
      },
      {
        id: 'cad-1',
        title: '4. CAD-, CAM- И CAE-СИСТЕМЫ В МАШИНОСТРОЕНИИ',
        title_en: '4. CAD-, CAM- AND CAE-SYSTEMS IN MECHANICAL ENGINEERING',
        content: `В учебном комплексе рассматриваются современные системы автоматизированного проектирования и инженерного анализа: Autodesk Inventor, SolidWorks, T-FLEX CAD. Показаны возможности параметрического моделирования, автоматического формирования спецификаций, инженерных расчётов и интеграции с CAM-системами для подготовки управляющих программ станков с ЧПУ.

В настоящем учебном пособии рассматриваются основы работы в некоторых CAD/CAE-системах, которые могут быть применены в технологии машиностроения.

CALS-технологии подразумевают использование различных CAD/CAM/CAE/PDM-систем. Отдельные модули этих систем в рамках одного предприятия позволяют осуществлять управление проектом (PDM-системы), инженерные расчёты, анализ, моделирование и оптимизацию проектных решений (CAE-системы), двух- и трёхмерное проектирование деталей и сборочных единиц (CAD-системы), разработку технологических процессов, синтез управляющих программ для технологического оборудования с ЧПУ, моделирование процессов обработки, в том числе построение траекторий относительного движения инструмента и заготовки в процессе обработки, расчёт норм времени обработки (CAM-системы).

MechaniCS для AutoCAD Mechanical представляет собой приложение, расширяющее возможности AutoCAD Mechanical для работы с машиностроительными чертежами. Система включает в себя базу данных стандартных деталей, инструменты для простановки размеров, допусков, шероховатостей, создания спецификаций и другой конструкторской документации.

Основные возможности MechaniCS:
- Вставка формата чертежа
- Вставка стандартных деталей из базы данных
- Вставка обозначения неразъёмного соединения
- Простановка обозначения видов, разрезов и сечений
- Простановка размеров на чертеже
- Простановка допусков формы и расположения
- Простановка шероховатости поверхности
- Простановка знаков маркирования и клеймения
- Простановка позиций на чертеже
- Создание спецификации
- Размещение на чертеже технических требований`,
        content_en: `The educational complex considers modern computer-aided design and engineering analysis systems: Autodesk Inventor, SolidWorks, T-FLEX CAD. The possibilities of parametric modeling, automatic specification generation, engineering calculations and integration with CAM systems for preparing control programs for CNC machines are shown.

This educational manual considers the basics of working in some CAD/CAE systems that can be applied in mechanical engineering technology.

CALS technologies imply the use of various CAD/CAM/CAE/PDM systems. Individual modules of these systems within one enterprise allow project management (PDM systems), engineering calculations, analysis, modeling and optimization of design solutions (CAE systems), two- and three-dimensional design of parts and assembly units (CAD systems), development of technological processes, synthesis of control programs for technological equipment with CNC, modeling of processing processes, including construction of trajectories of relative movement of tool and blank during processing, calculation of processing time standards (CAM systems).

MechaniCS for AutoCAD Mechanical is an application that extends the capabilities of AutoCAD Mechanical for working with mechanical engineering drawings. The system includes a database of standard parts, tools for dimensioning, tolerances, roughness, creating specifications and other design documentation.

Main capabilities of MechaniCS:
- Inserting drawing format
- Inserting standard parts from database
- Inserting designation of non-detachable connection
- Placing designation of views, sections and cuts
- Dimensioning on drawing
- Placing form and position tolerances
- Placing surface roughness
- Placing marking and stamping signs
- Placing positions on drawing
- Creating specification
- Placing technical requirements on drawing`
      },
      {
        id: 'cad-2',
        title: '4.1. AUTODESK INVENTOR PROFESSIONAL SUITE',
        title_en: '4.1. AUTODESK INVENTOR PROFESSIONAL SUITE',
        content: `Autodesk Inventor Professional Suite – комплексная система трёхмерного проектирования, предназначенная для создания цифровых прототипов изделий машиностроения.

Основные возможности системы:
- Создание 2D-чертежей
- Создание твёрдотельных моделей деталей
- Создание сборок из деталей
- Создание сборочных чертежей
- Создание схемы разборки
- Тонирование и анимация изображения
- Проектирование валов

Система поддерживает параметрическое моделирование, что позволяет быстро вносить изменения в конструкцию и автоматически обновлять связанные чертежи и спецификации.

Autodesk Inventor обеспечивает интеграцию с другими системами Autodesk, такими как AutoCAD, и позволяет обмениваться данными с системами CAM для подготовки управляющих программ для станков с ЧПУ.`,
        content_en: `Autodesk Inventor Professional Suite is a comprehensive three-dimensional design system designed for creating digital prototypes of mechanical engineering products.

Main capabilities of the system:
- Creating 2D drawings
- Creating solid models of parts
- Creating assemblies from parts
- Creating assembly drawings
- Creating disassembly diagrams
- Shading and animation of images
- Shaft design

The system supports parametric modeling, which allows quickly making changes to the design and automatically updating related drawings and specifications.

Autodesk Inventor provides integration with other Autodesk systems, such as AutoCAD, and allows data exchange with CAM systems for preparing control programs for CNC machines.`
      },
      {
        id: 'cad-3',
        title: '4.2. РАБОТА В СРЕДЕ SOLIDWORKS PREMIUM',
        title_en: '4.2. WORKING IN SOLIDWORKS PREMIUM',
        content: `SolidWorks Premium – система трёхмерного проектирования, широко используемая в машиностроении для создания деталей, сборок и чертежей.

Основные возможности:
- Создание 2D-чертежей
- Создание твёрдотельных моделей
- Создание сборок
- Создание сборочных чертежей
- Создание схемы разборки

SolidWorks поддерживает параметрическое моделирование, ассоциативные связи между деталями в сборках, автоматическое создание спецификаций и другие функции, необходимые для эффективной работы конструктора.

Система имеет интуитивно понятный интерфейс и широкие возможности настройки под конкретные задачи проектирования.`,
        content_en: `SolidWorks Premium is a three-dimensional design system widely used in mechanical engineering for creating parts, assemblies and drawings.

Main capabilities:
- Creating 2D drawings
- Creating solid models
- Creating assemblies
- Creating assembly drawings
- Creating disassembly diagrams

SolidWorks supports parametric modeling, associative connections between parts in assemblies, automatic specification creation and other functions necessary for effective work of a designer.

The system has an intuitive interface and wide possibilities for customization to specific design tasks.`
      },
      {
        id: 'cad-4',
        title: '4.3. РАБОТА В СРЕДЕ T-FLEX CAD',
        title_en: '4.3. WORKING IN T-FLEX CAD',
        content: `T-FLEX CAD – система автоматизированного проектирования.

Основные возможности:
- Начало работы с системой
- Импорт файлов в T-FLEX CAD 11
- Параметрическое моделирование
- Создание чертежей и спецификаций

Все подсистемы T-FLEX имеют русскоязычный интерфейс, ориентированы на российские стандарты, технические условия, оборудование и т.д.

Каждая подсистема может работать в комплексе с другими подсистемами или в автономном режиме.

Пакет T-FLEX включает следующие подсистемы:
I. Автоматизация конструкторских работ
- T-FLEX CAD LT – автоматизация черчения
- T-FLEX CAD 2D – автоматизация проектирования
- T-FLEX CAD 3D SE – подготовка чертежей по 3D – моделям
- T-FLEX CAD 3D – трёхмерное моделирование

II. Автоматизация технологической подготовки производства
- T-FLEX ТехноПро – автоматизация технологического проектирования
- T-FLEX ЧПУ – подготовка программ для станков с ЧПУ

III. Автоматизация инженерных расчётов
- T-FLEX Эйлер – динамический анализ механических систем
- T-FLEX Расчёты/Зубчатые передачи – расчёт и проектирование зубчатых передач
- T-FLEX Пружины – расчёт и конструирование упругих элементов`,
        content_en: `T-FLEX CAD is a computer-aided design system.

Main capabilities:
- Getting started with the system
- Importing files into T-FLEX CAD 11
- Parametric modeling
- Creating drawings and specifications

All T-FLEX subsystems have a Russian-language interface, are oriented to Russian standards, technical conditions, equipment, etc.

Each subsystem can work in a complex with other subsystems or in autonomous mode.

The T-FLEX package includes the following subsystems:
I. Automation of design work
- T-FLEX CAD LT – drawing automation
- T-FLEX CAD 2D – design automation
- T-FLEX CAD 3D SE – drawing preparation from 3D models
- T-FLEX CAD 3D – three-dimensional modeling

II. Automation of technological production preparation
- T-FLEX TechnoPro – technological design automation
- T-FLEX CNC – program preparation for CNC machines

III. Automation of engineering calculations
- T-FLEX Euler – dynamic analysis of mechanical systems
- T-FLEX Calculations/Gear Transmissions – calculation and design of gear transmissions
- T-FLEX Springs – calculation and design of elastic elements`
      },
      {
        id: 'cae-1',
        title: '5. РАБОТА С САЕ-СИСТЕМАМИ. РАСЧЁТЫ В СРЕДЕ MECHANICS',
        title_en: '5. WORKING WITH CAE SYSTEMS. CALCULATIONS IN MECHANICS',
        content: `CAE-системы (Computer Aided Engineering) предназначены для инженерных расчётов, анализа, моделирования и оптимизации проектных решений.

Расчёты в среде MechaniCS включают:
- Статический расчёт балки
- Расчёт пружины растяжения
- Расчёт зубчатых передач
- Расчёт размерных цепей
- Предварительные расчёты при вставке стандартных деталей

Статический расчёт балки позволяет определить напряжения и деформации в балке под действием приложенных нагрузок.

Расчёт пружины растяжения включает определение геометрических параметров пружины, обеспечивающих заданные характеристики упругости.

Расчёт зубчатых передач позволяет определить геометрические параметры зубчатых колёс, контактные напряжения, изгибные напряжения в зубе и другие характеристики передачи.

Расчёт размерных цепей используется для определения допусков и отклонений размеров в размерных цепях, обеспечения требуемой точности сборки.`,
        content_en: `CAE systems (Computer Aided Engineering) are designed for engineering calculations, analysis, modeling and optimization of design solutions.

Calculations in MechaniCS include:
- Static beam calculation
- Tension spring calculation
- Gear transmission calculation
- Dimensional chain calculation
- Preliminary calculations when inserting standard parts

Static beam calculation allows determining stresses and deformations in a beam under the action of applied loads.

Tension spring calculation includes determining geometric parameters of the spring that ensure specified elasticity characteristics.

Gear transmission calculation allows determining geometric parameters of gears, contact stresses, bending stresses in the tooth and other transmission characteristics.

Dimensional chain calculation is used for determining tolerances and deviations of dimensions in dimensional chains, ensuring required assembly accuracy.`
      },
      {
        id: 'cae-2',
        title: '5.1. РАСЧЁТЫ В СРЕДЕ AUTODESK INVENTOR',
        title_en: '5.1. CALCULATIONS IN AUTODESK INVENTOR',
        content: `Autodesk Inventor включает модули для инженерных расчётов и анализа:

Исследование напряжённо-деформированного состояния деталей и узлов выполняется с использованием метода конечных элементов (МКЭ). Этот метод позволяет:
- Определить напряжения и деформации в деталях под действием приложенных нагрузок
- Провести анализ прочности конструкции
- Оптимизировать геометрию деталей с учётом требований прочности и жёсткости

Расчёт выполняется в несколько этапов:
1. Создание геометрической модели детали или сборки
2. Задание свойств материалов
3. Приложение нагрузок и граничных условий
4. Построение сетки конечных элементов
5. Выполнение расчёта
6. Анализ результатов

Результаты расчёта отображаются в виде цветовых карт напряжений и деформаций, графиков, таблиц числовых значений.`,
        content_en: `Autodesk Inventor includes modules for engineering calculations and analysis:

Investigation of stress-strain state of parts and units is performed using the finite element method (FEM). This method allows:
- Determining stresses and deformations in parts under the action of applied loads
- Conducting strength analysis of the structure
- Optimizing part geometry taking into account strength and stiffness requirements

Calculation is performed in several stages:
1. Creating geometric model of part or assembly
2. Setting material properties
3. Applying loads and boundary conditions
4. Building finite element mesh
5. Performing calculation
6. Analyzing results

Calculation results are displayed in the form of color maps of stresses and deformations, graphs, tables of numerical values.`
      },
      {
        id: 'cae-3',
        title: '5.2. РАСЧЁТЫ В СРЕДЕ SOLIDWORKS PREMIUM',
        title_en: '5.2. CALCULATIONS IN SOLIDWORKS PREMIUM',
        content: `SolidWorks Premium включает модули для инженерных расчётов:

Исследование напряжённо-деформированного состояния выполняется с использованием модуля Simulation, который реализует метод конечных элементов.

Основные возможности:
- Статический анализ напряжений
- Частотный анализ (определение собственных частот и форм колебаний)
- Анализ устойчивости (расчёт критических нагрузок)
- Тепловой анализ
- Анализ усталостной прочности

Использование модулей анализа потока позволяет проводить анализ течения жидкостей и газов в каналах и полостях деталей, определять распределение давления и скорости потока.

Результаты расчётов отображаются в виде цветовых карт, графиков, анимации деформаций и других визуализаций, что облегчает анализ и интерпретацию результатов.`,
        content_en: `SolidWorks Premium includes modules for engineering calculations:

Investigation of stress-strain state is performed using the Simulation module, which implements the finite element method.

Main capabilities:
- Static stress analysis
- Frequency analysis (determining natural frequencies and vibration modes)
- Stability analysis (calculating critical loads)
- Thermal analysis
- Fatigue strength analysis

Use of flow analysis modules allows conducting analysis of flow of liquids and gases in channels and cavities of parts, determining distribution of pressure and flow velocity.

Calculation results are displayed in the form of color maps, graphs, deformation animations and other visualizations, which facilitates analysis and interpretation of results.`
      },
      {
        id: 'cae-4',
        title: '5.3. РАСЧЁТЫ В СРЕДЕ T-FLEX CAD',
        title_en: '5.3. CALCULATIONS IN T-FLEX CAD',
        content: `T-FLEX CAD включает модули для инженерных расчётов:

Исследование напряжённо-деформированного состояния выполняется с использованием модуля T-FLEX Анализ, который реализует метод конечных элементов.

Тепловой анализ деталей и узлов позволяет:
- Определить распределение температуры в деталях
- Рассчитать тепловые деформации
- Оптимизировать системы охлаждения и нагрева

В тепловом анализе роль граничных условий выполняют приложенные температуры, тепловые потоки, конвекция и излучение.

При задании температурных нагружений необходимо учитывать условия эксплуатации детали или узла.

Результатами теплового анализа являются:
- Распределение температуры по объёму детали
- Градиенты температуры
- Тепловые потоки
- Тепловые деформации

Результаты отображаются в виде цветовых карт температуры, графиков изменения температуры вдоль выбранных линий, таблиц числовых значений.`,
        content_en: `T-FLEX CAD includes modules for engineering calculations:

Investigation of stress-strain state is performed using the T-FLEX Analysis module, which implements the finite element method.

Thermal analysis of parts and units allows:
- Determining temperature distribution in parts
- Calculating thermal deformations
- Optimizing cooling and heating systems

In thermal analysis, the role of boundary conditions is performed by applied temperatures, heat fluxes, convection and radiation.

When setting temperature loads, it is necessary to take into account operating conditions of the part or unit.

Results of thermal analysis are:
- Temperature distribution over part volume
- Temperature gradients
- Heat fluxes
- Thermal deformations

Results are displayed in the form of color maps of temperature, graphs of temperature change along selected lines, tables of numerical values.`
      },
      {
        id: 'conclusion',
        title: 'ЗАКЛЮЧЕНИЕ',
        title_en: 'CONCLUSION',
        content: `Изучение дисциплины «Автоматизация конструкторского и технологического проектирования» формирует у студентов целостное представление о современных цифровых технологиях проектирования и производства. Использование CALS- и PLM-концепций, CAD/CAE/CAM-систем и интегрированных информационных сред является основой повышения конкурентоспособности машиностроительных предприятий в условиях цифровой экономики.

Современное машиностроение невозможно представить без комплексной автоматизации процессов проектирования и технологической подготовки производства. Внедрение CALS-технологий позволяет существенно сократить сроки разработки продукции, повысить качество проектных решений и снизить затраты на всех этапах жизненного цикла изделия.

Освоение методов автоматизированного проектирования, включая работу с CAD/CAE/CAM-системами, формирует у будущих инженеров компетенции, необходимые для успешной работы в условиях цифровой трансформации промышленности. Понимание принципов интегрированной информационной среды и управления жизненным циклом изделия становится ключевым фактором профессиональной успешности в современном машиностроении.

Дальнейшее развитие автоматизации проектирования связано с внедрением технологий искусственного интеллекта, облачных вычислений, цифровых двойников изделий и производственных систем. Эти технологии открывают новые возможности для оптимизации проектных решений, прогнозирования поведения изделий в эксплуатации и создания интеллектуальных производственных систем.

Изучение данной дисциплины закладывает фундамент для дальнейшего профессионального роста и адаптации к быстро меняющимся требованиям современной промышленности.`,
        content_en: `Studying the discipline "Automation of Design and Technological Design" forms in students a holistic understanding of modern digital technologies of design and production. The use of CALS and PLM concepts, CAD/CAE/CAM systems and integrated information environments is the basis for increasing the competitiveness of mechanical engineering enterprises in the conditions of digital economy.

Modern mechanical engineering cannot be imagined without comprehensive automation of design and technological production preparation processes. Implementation of CALS technologies allows to significantly reduce product development time, improve quality of design solutions and reduce costs at all stages of product life cycle.

Mastering methods of automated design, including work with CAD/CAE/CAM systems, forms in future engineers competencies necessary for successful work in conditions of digital transformation of industry. Understanding principles of integrated information environment and product life cycle management becomes a key factor of professional success in modern mechanical engineering.

Further development of design automation is associated with implementation of artificial intelligence technologies, cloud computing, digital twins of products and production systems. These technologies open new possibilities for optimizing design solutions, predicting product behavior in operation and creating intelligent production systems.

Studying this discipline lays the foundation for further professional growth and adaptation to rapidly changing requirements of modern industry.`
      }
    ]
  }
]

export const lessonsData = baseLessonsData.map((lesson) => attachImagesToLesson(lesson, lessonImages))
