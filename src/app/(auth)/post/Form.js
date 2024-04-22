'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import Multiselect from '@/components/Multiselect'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import axios from '@/lib/axios'
import { MultiSelect } from "react-multi-select-component";
import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'

const Form = (props) => {
    const router = useRouter()
    const [title, setTitle] = useState(props.post.title || '')
    const [summary, setSummary] = useState(props.post.summary || '')
    const [tagsList, setTagsList] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchTags();
    }, []);

    const [errors, setErrors] = useState([])
    let url = 'http://localhost:8000/api/posts';


    const fetchTags = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/tags', {
                headers: {
                    'Authorization': `Bearer 1|qvil55IhHvI6ugBcNS5fXeiyCANtyzv2WJZpasyT1a875246`
                }
            });
            const jsonData = await response.json();

            const formTags = jsonData.data.map((data) => ({
                label: data.name,
                value: data.id,
            }));

            setTagsList(formTags);

            if (props.post) {
                const tags = props.post.tags.map((tag, index) => ({
                    label: tag,
                    value: index + 1,
                }));
                setTags(tags);
            }
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    const submitForm = event => {
        event.preventDefault()

        setErrors([])
        
        if (props.post) {
            axios
                .put(url + `/${props.post.id}`, {
                    title,
                    summary,
                    tags,
                    setErrors,
                }, {
                    headers: {
                        'Authorization': `Bearer 1|qvil55IhHvI6ugBcNS5fXeiyCANtyzv2WJZpasyT1a875246`
                    }
                })
                .then(res => {
                    // router.push('/');
                    props.closeModal()
                })
                .catch(error => {
                    console.log(error);
                    if (error.response.status !== 422) throw error

                    setErrors(error.response.data.errors)
                })
        } else {
            axios
                .post(url, {
                    title,
                    summary,
                    tags,
                    setErrors,
                }, {
                    headers: {
                        'Authorization': `Bearer 1|qvil55IhHvI6ugBcNS5fXeiyCANtyzv2WJZpasyT1a875246`
                    }
                })
                .then(res => {
                    // router.push('/');
                    props.closeModal()
                })
                .catch(error => {
                    console.log(error);
                    if (error.response.status !== 422) throw error

                    setErrors(error.response.data.errors)
                })
        }
    }

    return (
        <form onSubmit={submitForm} className='text-left '>
            {/* Name */}
            <div >
                <Label htmlFor="title ">Title</Label>

                <Input
                    id="title"
                    type="text"
                    value={title}
                    className="block mt-1 w-full text-gray-700"
                    onChange={event => setTitle(event.target.value)}
                    required
                    autoFocus
                />

                <InputError messages={errors.title} className="mt-2" />
            </div>

            {/* Email Address */}
            <div className="mt-4">
                <Label htmlFor="summary">Summary</Label>

                <Textarea
                    id="summary"
                    type="summary"
                    value={summary}
                    className="block mt-1 w-full text-gray-700"
                    onChange={event => setSummary(event.target.value)}
                    required
                />

                <InputError messages={errors.summary} className="mt-2" />
            </div>

            <div className="mt-4">
                <Label htmlFor="tags">Tags</Label>

                <MultiSelect
                    options={tagsList}
                    value={tags}
                    className='text-gray-700'
                    onChange={setTags}
                    labelledBy="Select"
                />
                {/* <Multiselect
                    id="tags"
                    type="tags"
                    value={summary}
                    className="block mt-1 w-full"
                    onChange={event => setSummary(event.target.value)}
                    required
                /> */}

                <InputError messages={errors.summary} className="mt-2" />
            </div>


            <div className="flex items-center justify-end mt-8">
                <Button type="button" className="ml-4" onClick={props.closeModal}>Cancel</Button>
                <Button className="ml-4 !bg-fuchsia-500 hover:!bg-fuchsia-600">Save</Button>
            </div>
        </form>
    )
}

export default Form
