import { Get, Post, Put, Patch, Delete, Query, Param, Body, UseInterceptors } from "@nestjs/common";
import { RestService } from "./rest.service";
import { RestQueryDto } from "./dto/query.dto";
import { RestRouteInterceptor } from "./route.interceptor";

@UseInterceptors(RestRouteInterceptor)
export class RestController<T> {
    private restControllerOptions = {}
    constructor(private readonly service: RestService<T>) {
        this.restControllerOptions = Object.assign({
            exclude: [],
            only: []
        })
    }

    @Get('')
    async getMany(@Query() dto: RestQueryDto) {
            return this.service.getMany(dto)
     }

    @Get(':id')
    async getOne(@Param('id') id: number, @Query() dto: RestQueryDto) {
        return this.service.getOne(id, dto)
    }

    @Post('')
    async createOne(@Body() entity: T) {
        return this.service.createOne(entity)
    }

    @Put(':id')
    async updateOne(@Param('id') id: number, @Body() entity: T) {
        return this.service.updateOne(id, entity)
    }

    @Patch(':id')
    async PatchOne(@Param('id') id: number, @Body() info: T) {
        return this.service.patchOne(id, info)
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: number) {
        return this.service.deleteOne(id)
    }
}