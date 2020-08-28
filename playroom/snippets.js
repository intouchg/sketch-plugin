export default [
    {
        group: 'Text',
        name: 'Default',
        code: `
            <Text>
                
            </Text>
        `,
    },
    {
        group: 'Button',
        name: 'Default',
        code: `
            <Button>
                Click Me
            </Button>
        `,
    },
    {
        group: 'Link',
        name: 'Default',
        code: `
            <Link>
                Click Me
            </Link>
        `,
    },
    {
        group: 'Flex',
        name: 'Default',
        code: `
            <Flex>
                
            </Flex>
        `,
    },
    {
        group: 'Grid',
        name: 'Default',
        code: `
            <Grid>
                
            </Grid>
        `,
    },
    {
        group: 'Heading',
        name: 'Default',
        code: `
            <Heading>
                
            </Heading>
        `,
    },
    {
        group: 'Accordion',
        name: 'Default',
        code: `
            <Accordion defaultActiveId="0">
                <AccordionToggle id="0">
                    {(active) => (
                        Toggle Accordion 1
                    )}
                </AccordionToggle>
                <AccordionCollapse id="0">
                    {(active) => (
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel pretium nulla. Donec tristique nisi eu venenatis iaculis. Mauris odio erat, consequat sed odio id, vestibulum efficitur risus.
                    )}
                </AccordionCollapse>
                <AccordionToggle id="1">
                    {(active) => (
                        Toggle Accordion 2
                    )}
                </AccordionToggle>
                <AccordionCollapse id="1">
                    {(active) => (
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel pretium nulla. Donec tristique nisi eu venenatis iaculis. Mauris odio erat, consequat sed odio id, vestibulum efficitur risus.
                    )}
                </AccordionCollapse>
            </Accordion>
        `,
    },
    {
        group: 'Tabs',
        name: 'Default',
        code: `
            <Tabs defaultActiveId="0">
                <TabActivate id="0">
                    {(active) => (
                        Activate Tab 1
                    )}
                </TabActivate>
                <TabActivate id="1">
                    {(active) => (
                        Activate Tab 2
                    )}
                </TabActivate>
                <TabContent id="0">
                    {(active) => (
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel pretium nulla. Donec tristique nisi eu venenatis iaculis. Mauris odio erat, consequat sed odio id, vestibulum efficitur risus.
                    )}
                </TabContent>
                <TabContent id="1">
                    {(active) => (
                        Vestibulum odio erat, imperdiet ultricies ante id, lobortis fermentum nunc. Sed dictum, dolor et mollis aliquet, urna ante semper neque, vitae vestibulum ligula libero in nulla.
                    )}
                </TabContent>
            </Tabs>
        `,
    },
]
